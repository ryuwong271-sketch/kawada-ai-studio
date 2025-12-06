
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Upload, Download, Wand2, RefreshCcw, Image as ImageIcon, 
  ScanEye, Eraser, Maximize, Sliders, Trash2, ArrowLeft, Sparkles, Undo, Redo, RotateCcw
} from 'lucide-react';
import { Button } from './ui/Button';
import { editImageWithGemini, analyzeImageWithGemini } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import { GuideSection } from './GuideSection';

type Tool = 'edit' | 'analyze' | 'bg' | 'style' | 'upscale';

interface Point {
    x: number;
    y: number;
}

const PRESET_PROMPTS: Record<string, string> = {
    'preset.bluesky': "Replace the sky with a clear blue sky and fluffy clouds.",
    'preset.sunset': "Change the lighting to a golden hour sunset atmosphere.",
    'preset.winter': "Cover the scene in white snow, winter season.",
    'preset.suit': "Change the person's clothing to a professional business suit.",
    'preset.smile': "Make the person smile naturally.",
    'preset.glasses': "Add stylish sunglasses to the person.",
    'preset.anime': "Convert this image into a Japanese anime style.",
    'preset.sketch': "Convert this image into a pencil sketch.",
    'preset.cyberpunk': "Make it look like a cyberpunk city",
    'preset.3drender': "Turn this into a 3D render style",
    'preset.vector': "Make it minimalist vector art",
    'preset.cinematic': "Add dramatic cinematic lighting",

    'preset.whiteBg': "Isolate the main subject on a white background.",
    'preset.watermark': "Remove all watermarks and logos from this image, fill in the gaps naturally.",
    'preset.text': "Remove all text from this image.",
    'preset.people': "Remove all people from this image.",
    'preset.object': "Remove the unwanted object.",
    'preset.transparent': "Remove background leaving it transparent.",

    'preset.vintage': "Apply a vintage film look, Kodak Portra style",
    'preset.hdr': "High dynamic range, HDR, pop details",
    'preset.warm': "Warm color temperature, cozy atmosphere",
    'preset.cool': "Cool color temperature, modern blue tones",
    'preset.sharp': "High resolution, sharp focus, 4k",
    'preset.fixLight': "Fix lighting and color balance",
    'preset.vibrant': "Vibrant colors, high contrast",
    'preset.bw': "Black and white artistic photography",

    'preset.4k': "Upscale to 4K resolution, extremely detailed, sharp focus",
    'preset.portrait': "Enhance facial details, fix blur, high quality portrait",
    'preset.restore': "Denoise, deblur, sharpen, high fidelity",
    'preset.illus': "Crisp lines, vector style, clean edges",

    'preset.analyze.general': "Describe this image in detail.",
    'preset.analyze.objects': "List all visible objects in this image.",
    'preset.analyze.text': "Extract all text visible in the image.",
    'preset.analyze.marketing': "Generate SEO-friendly hashtags and marketing keywords for this image."
};

export const ImageEditor: React.FC = () => {
  const { t, language } = useLanguage();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // History State
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Tools & State
  const [activeTool, setActiveTool] = useState<Tool>('edit');
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState<string>('');
  const [comparePosition, setComparePosition] = useState(50);
  const [brushSize, setBrushSize] = useState(30);
  
  // Cursor Tracking
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showBrush, setShowBrush] = useState(false);
  
  // Mask Drawing
  const [isDrawing, setIsDrawing] = useState(false);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const [hasMask, setHasMask] = useState(false);
  
  // Pending preset state (from landing page click)
  const [pendingPreset, setPendingPreset] = useState<{tool: Tool, prompt: string} | null>(null);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t('workspace.sizeError'));
        return;
      }
      loadAndReset(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        loadAndReset(file);
    }
  };

  const loadAndReset = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setProcessedImage(null);
      setHistory([]);
      setHistoryIndex(-1);
      setAnalysis('');
      setError(null);
      clearMask();
      setIsWorkspaceOpen(true);

      // CRITICAL: Apply pending preset if exists to ensure correct tool/prompt
      // This handles the flow: Guide -> Preset Click -> Workspace -> Upload
      if (pendingPreset) {
          setActiveTool(pendingPreset.tool);
          setPrompt(pendingPreset.prompt);
          setPendingPreset(null);
      } else {
          // If manual upload without preset, clear prompt to start fresh
          setPrompt('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePresetClick = (toolId: string, presetKey: string) => {
    let mappedTool: Tool = 'edit';
    
    // Map guide IDs to tool IDs
    if (toolId === 'magic') mappedTool = 'edit';
    else if (toolId === 'vision') mappedTool = 'analyze';
    else if (['bg', 'style', 'upscale'].includes(toolId)) mappedTool = toolId as Tool;
    
    const presetPrompt = PRESET_PROMPTS[presetKey] || '';
    
    // Set immediate state for empty workspace
    setActiveTool(mappedTool);
    setPrompt(presetPrompt);
    setIsWorkspaceOpen(true);
    
    // Set pending state for when image is eventually uploaded
    setPendingPreset({ tool: mappedTool, prompt: presetPrompt });
  };

  const clearMask = () => {
    const canvas = maskCanvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        setHasMask(false);
    }
  };

  // Resize canvas to match image when tool changes or window resizes
  useEffect(() => {
    if (activeTool === 'bg' && imgRef.current && maskCanvasRef.current) {
        const img = imgRef.current;
        const canvas = maskCanvasRef.current;

        const updateCanvasSize = () => {
            if (img.width > 0 && img.height > 0) {
                 // Check dimensions to prevent unnecessary resets
                 if (canvas.width !== img.width || canvas.height !== img.height) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // Resizing clears the canvas content, so we must reset mask state.
                    // Ideally we would redraw paths here if we stored them.
                    setHasMask(false);
                 }
            }
        };

        // Initial sizing
        updateCanvasSize();

        // Use ResizeObserver to keep canvas in sync with image layout changes (e.g. rotation, split view)
        const observer = new ResizeObserver(() => {
            updateCanvasSize();
        });
        
        observer.observe(img);

        return () => observer.disconnect();
    }
  }, [activeTool, originalImage]);


  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    // Modified: allow drawing on original if no processed, OR on top of processed if that's the base
    // Use processedImage check to allow cumulative edits (we draw on top of what's visible)
    if (activeTool !== 'bg' || (!originalImage && !processedImage)) return;
    setIsDrawing(true);
    setHasMask(true);
    
    const canvas = maskCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas || !imgRef.current) return;

    // Get coordinates relative to the image
    const rect = imgRef.current.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // Red semi-transparent mask
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || activeTool !== 'bg' || (!originalImage && !processedImage)) return;

    const canvas = maskCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas || !imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const processImage = async () => {
    // Support Cumulative Edits: Use processedImage if available, else originalImage
    const currentImage = processedImage || originalImage;
    if (!currentImage) return;
    
    setIsProcessing(true);
    setError(null);

    try {
      if (activeTool === 'analyze') {
        const promptToUse = prompt.trim() || PRESET_PROMPTS['preset.analyze.general'];
        const result = await analyzeImageWithGemini(currentImage, promptToUse, "image/png", language);
        setAnalysis(result);
      } else {
        let finalPrompt = prompt;
        let imageToSend = currentImage;

        // Special handling for Smart Remove with Mask
        if (activeTool === 'bg') {
             // If we have a mask drawn, we need to composite it onto the current image
             if (hasMask && maskCanvasRef.current && imgRef.current) {
                 const sourceImg = new Image();
                 sourceImg.src = currentImage; // Use current base for cumulative edit
                 await new Promise((resolve) => { sourceImg.onload = resolve; });

                 const canvas = document.createElement('canvas');
                 canvas.width = sourceImg.naturalWidth;
                 canvas.height = sourceImg.naturalHeight;
                 const ctx = canvas.getContext('2d');
                 
                 if (ctx) {
                     // Draw current image
                     ctx.drawImage(sourceImg, 0, 0);
                     
                     // Draw mask (scaled from display size to natural size)
                     const displayWidth = imgRef.current.width;
                     const displayHeight = imgRef.current.height;
                     
                     ctx.drawImage(
                         maskCanvasRef.current, 
                         0, 0, displayWidth, displayHeight, 
                         0, 0, sourceImg.naturalWidth, sourceImg.naturalHeight
                     );
                     
                     imageToSend = canvas.toDataURL('image/png');
                     
                     if (!finalPrompt) {
                         finalPrompt = "Remove the area highlighted in red. Fill in the background naturally.";
                     } else {
                         finalPrompt += " Remove the area highlighted in red.";
                     }
                 }
             } else if (!finalPrompt) {
                 finalPrompt = "Remove the background from the main subject.";
             }
        }

        // Default prompts for other tools
        if (activeTool === 'style' && !prompt) finalPrompt = "Enhance details, lighting, and sharpness.";
        if (activeTool === 'upscale' && !prompt) finalPrompt = "Upscale this image to high resolution, improve sharpness, details and clarity. 4k resolution.";
        if (!finalPrompt && activeTool !== 'bg') finalPrompt = "Enhance this image.";

        const result = await editImageWithGemini(imageToSend, finalPrompt);
        
        // Add to history
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(result);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        
        setProcessedImage(result);
        
        // Clear mask if we just processed a removal, so the red paint doesn't stay on the new image
        if (activeTool === 'bg') {
            clearMask();
        }
      }
    } catch (err) {
      console.error(err);
      setError(t('workspace.error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUndo = () => {
    if (historyIndex > -1) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        if (newIndex === -1) {
            setProcessedImage(null); // Revert to original state
        } else {
            setProcessedImage(history[newIndex]);
        }
    }
    // Note: Mask is not restored in this simple history implementation
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setProcessedImage(history[newIndex]);
    }
  };

  const handleReset = () => {
      setProcessedImage(null);
      setHistory([]);
      setHistoryIndex(-1);
      setAnalysis('');
      setPrompt('');
      clearMask();
  };

  const applyPreset = (presetPrompt: string) => {
      setPrompt(presetPrompt);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Forward mouse move to draw handler if drawing
    if (isDrawing) {
        draw(e);
    }

    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        let clientX, clientY;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        // 1. Compare Slider Logic (Only if processed image exists AND we aren't using the BG tool)
        // Disable slider when using mask tool to prevent conflict
        if (processedImage && activeTool !== 'bg') {
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            setComparePosition((x / rect.width) * 100);
        }

        // 2. Brush Cursor Logic (Only if Smart Remove is active)
        if (activeTool === 'bg') {
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            setCursorPos({ x, y });
        }
    }
  }, [processedImage, activeTool, isDrawing]);

  const showLanding = !originalImage && !isWorkspaceOpen;

  // Computed states for buttons
  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < history.length - 1;
  const canReset = processedImage !== null || history.length > 0 || prompt.trim().length > 0 || analysis.length > 0 || hasMask;

  return (
    <>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      
      {showLanding ? (
        <div className="w-full max-w-5xl mx-auto px-4 -mt-4 relative z-20 pb-20">
            <div 
                className="group relative border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-surface/40 backdrop-blur-md rounded-3xl p-6 md:p-16 text-center transition-all duration-300 hover:bg-white/80 dark:hover:bg-surface/60 hover:border-primary/30 cursor-pointer overflow-hidden shadow-xl dark:shadow-black/50"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-zinc-200 to-zinc-100 dark:from-surfaceHighlight dark:to-surface rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl group-hover:scale-105 transition-transform duration-300 ring-1 ring-black/5 dark:ring-white/10">
                <Upload className="w-6 h-6 md:w-8 md:h-8 text-zinc-400 dark:text-zinc-300 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white mb-3">{t('upload.title')}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-6 md:mb-8 max-w-sm mx-auto text-sm leading-relaxed whitespace-pre-line">
                    {t('upload.desc')}
                </p>
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 w-full sm:w-auto">{t('upload.btn')}</Button>
            </div>
            </div>

            {/* Mini Gallery */}
            <div className="mt-12 md:mt-16 text-center">
                <p className="text-zinc-400 dark:text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-6">{t('upload.designedFor')}</p>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
                <Tag label={t('upload.tag.ecommerce')} color="emerald" />
                <Tag label={t('upload.tag.game')} color="violet" />
                <Tag label={t('upload.tag.marketing')} color="amber" />
                <Tag label={t('upload.tag.photo')} color="rose" />
                <Tag label={t('upload.tag.social')} color="sky" />
                <Tag label={t('upload.tag.fnb')} color="orange" />
                <Tag label={t('upload.tag.realestate')} color="indigo" />
                <Tag label={t('upload.tag.education')} color="lime" />
                </div>
            </div>

            {GuideSection && <GuideSection onUploadClick={() => fileInputRef.current?.click()} onPresetClick={handlePresetClick} />}
        </div>
      ) : (
        // Workspace UI
        <div className="fixed inset-0 z-50 bg-background flex flex-col transition-colors duration-300">
        {/* Workspace Header */}
        <header className="h-14 border-b border-zinc-200 dark:border-white/10 bg-background/80 backdrop-blur-md flex items-center justify-between px-4 shrink-0 z-40">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => { setOriginalImage(null); setIsWorkspaceOpen(false); }} 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline text-sm font-medium">{t('nav.back')}</span>
                </button>
                
                {/* Header Tools: Reset/Undo/Redo - Highlighted as requested */}
                <div className="flex items-center gap-2 border-l border-zinc-200 dark:border-white/10 pl-4 ml-2">
                    <button 
                        onClick={handleReset} 
                        disabled={!canReset}
                        className={`p-2 rounded-lg transition-all duration-200 border ${
                            canReset 
                            ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 shadow-sm' 
                            : 'text-zinc-300 dark:text-zinc-700 border-transparent cursor-not-allowed opacity-40'
                        }`} 
                        title={t('prop.reset')}
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <div className="h-4 w-px bg-zinc-200 dark:bg-white/10 mx-1"></div>
                    <button 
                        onClick={handleUndo} 
                        disabled={!canUndo}
                        className={`p-2 rounded-lg transition-all duration-200 border ${
                            canUndo
                            ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 shadow-sm'
                            : 'text-zinc-300 dark:text-zinc-700 border-transparent cursor-not-allowed opacity-40'
                        }`} 
                        title="Undo"
                    >
                        <Undo className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={handleRedo} 
                        disabled={!canRedo}
                        className={`p-2 rounded-lg transition-all duration-200 border ${
                            canRedo
                            ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 shadow-sm'
                            : 'text-zinc-300 dark:text-zinc-700 border-transparent cursor-not-allowed opacity-40'
                        }`} 
                        title="Redo"
                    >
                        <Redo className="w-4 h-4" />
                    </button>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <Button 
                    size="sm" 
                    variant="primary" 
                    icon={<Upload className="w-4 h-4" />}
                    onClick={() => fileInputRef.current?.click()}
                    className="shadow-[0_0_15px_rgba(56,189,248,0.3)] animate-pulse"
                >
                    <span className="hidden sm:inline">{t('workspace.uploadNew')}</span>
                    <span className="sm:hidden">Upload</span>
                </Button>

                {processedImage && (
                    <a href={processedImage} download="ken-ai-edit.png">
                        <Button size="sm" variant="secondary" icon={<Download className="w-4 h-4" />}>
                            <span className="hidden sm:inline">{t('workspace.export')}</span>
                            <span className="sm:hidden">Save</span>
                        </Button>
                    </a>
                )}
            </div>
        </header>

        {/* Workspace Layout - Grid System for Responsive Layouts */}
        {/* Mobile: Portrait (Stack). Mobile Landscape: Split View (Narrower Sidebar). Desktop: 3-Col */}
        {/* mobile-landscape:grid-cols-[240px_1fr] reduces sidebar width for phones */}
        <div className="flex-1 grid overflow-hidden relative transition-all duration-300 grid-cols-1 grid-rows-[1fr_35vh_4rem] mobile-landscape:grid-cols-[240px_1fr] mobile-landscape:grid-rows-[1fr_4rem] lg:grid-cols-[4rem_20rem_1fr] lg:grid-rows-1">
            
            {/* Tool Sidebar (Desktop: Left, Mobile/Landscape: Bottom) */}
            <div className="
                row-start-3 mobile-landscape:row-start-2 mobile-landscape:col-span-2 lg:row-start-1 lg:col-span-1 lg:col-start-1
                flex flex-row lg:flex-col items-center justify-around lg:justify-center lg:py-6 gap-0 lg:gap-4
                border-t mobile-landscape:border-t lg:border-t-0 lg:border-r border-zinc-200 dark:border-white/10 bg-surface/90 backdrop-blur-sm z-30 w-full lg:w-16 h-full lg:h-full
            ">
                <ToolButton 
                    icon={<Wand2 />} 
                    label={t('tool.magic')} 
                    active={activeTool === 'edit'} 
                    onClick={() => setActiveTool('edit')} 
                    activeColor="bg-purple-500 shadow-purple-500/25"
                />
                <ToolButton 
                    icon={<Eraser />} 
                    label={t('tool.removeBg')} 
                    active={activeTool === 'bg'} 
                    onClick={() => setActiveTool('bg')} 
                    activeColor="bg-pink-500 shadow-pink-500/25"
                />
                <ToolButton 
                    icon={<Sliders />} 
                    label={t('tool.style')} 
                    active={activeTool === 'style'} 
                    onClick={() => setActiveTool('style')} 
                    activeColor="bg-blue-500 shadow-blue-500/25"
                />
                <ToolButton 
                    icon={<Maximize />} 
                    label={t('tool.upscale')} 
                    active={activeTool === 'upscale'} 
                    onClick={() => setActiveTool('upscale')} 
                    activeColor="bg-amber-500 shadow-amber-500/25"
                />
                <ToolButton 
                    icon={<ScanEye />} 
                    label={t('tool.analyze')} 
                    active={activeTool === 'analyze'} 
                    onClick={() => setActiveTool('analyze')} 
                    activeColor="bg-emerald-500 shadow-emerald-500/25"
                />
            </div>

            {/* Properties Panel (Desktop/Landscape: Left/Side, Portrait: Bottom Sheet) */}
            <div className="
                row-start-2 mobile-landscape:row-start-1 mobile-landscape:col-start-1 lg:col-start-2 lg:row-start-1
                flex flex-col w-full h-full
                border-t mobile-landscape:border-t-0 mobile-landscape:border-r lg:border-r border-zinc-200 dark:border-white/10 bg-background/90 backdrop-blur-sm z-20 transition-colors duration-300
            ">
                <div className="p-3 md:p-5 border-b border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-white/5">
                    <h2 className="text-xs md:text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
                        {activeTool === 'edit' && t('header.magic')}
                        {activeTool === 'bg' && t('header.bg')}
                        {activeTool === 'style' && t('header.style')}
                        {activeTool === 'upscale' && t('header.upscale')}
                        {activeTool === 'analyze' && t('header.analyze')}
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 md:space-y-6">
                    <div className="space-y-2 md:space-y-3">
                        <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{t('prop.prompt')}</label>
                        <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={t('prop.placeholder')}
                            className="w-full h-24 mobile-landscape:h-16 md:h-32 bg-surface border border-zinc-200 dark:border-white/10 rounded-lg p-3 text-sm text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all"
                        />
                    </div>

                    {activeTool === 'bg' && (
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{t('prop.brushSize')}</label>
                            <span className="text-xs font-mono text-zinc-500">{brushSize}px</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                min="5"
                                max="100"
                                value={brushSize}
                                onChange={(e) => setBrushSize(Number(e.target.value))}
                                className="flex-1 h-2 bg-zinc-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center">
                                <div 
                                    className="rounded-full bg-zinc-900 dark:bg-white transition-all"
                                    style={{ 
                                        width: Math.min(32, Math.max(4, brushSize * 0.32)) + 'px', 
                                        height: Math.min(32, Math.max(4, brushSize * 0.32)) + 'px' 
                                    }}
                                />
                            </div>
                        </div>
                        {/* Clear Mask Button */}
                        <Button 
                            size="sm" 
                            variant="secondary" 
                            className="w-full mt-2"
                            onClick={clearMask}
                            disabled={!hasMask}
                            icon={<Trash2 className="w-3.5 h-3.5" />}
                        >
                            {t('prop.clearMask')}
                        </Button>
                    </div>
                    )}

                    <div className="space-y-2 md:space-y-3">
                            <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{t('prop.presets')}</label>
                            {/* Scrollable list for mobile landscape, Grid for others */}
                            <div className="grid grid-cols-2 gap-2 mobile-landscape:flex mobile-landscape:overflow-x-auto mobile-landscape:pb-2 mobile-landscape:gap-3 mobile-landscape:scrollbar-hide">
                            {activeTool === 'edit' && (
                                <>
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.bluesky'])} label={t('preset.bluesky')} />
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.sunset'])} label={t('preset.sunset')} />
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.winter'])} label={t('preset.winter')} />
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.suit'])} label={t('preset.suit')} />
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.smile'])} label={t('preset.smile')} />
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.glasses'])} label={t('preset.glasses')} />
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.anime'])} label={t('preset.anime')} />
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.sketch'])} label={t('preset.sketch')} />
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.cyberpunk'])} label={t('preset.cyberpunk')} />
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.3drender'])} label={t('preset.3drender')} />
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.vector'])} label={t('preset.vector')} />
                                    <PresetBtn themeColor="purple" onClick={() => applyPreset(PRESET_PROMPTS['preset.cinematic'])} label={t('preset.cinematic')} />
                                </>
                            )}
                            {activeTool === 'bg' && (
                                <>
                                    <PresetBtn themeColor="pink" onClick={() => applyPreset(PRESET_PROMPTS['preset.whiteBg'])} label={t('preset.whiteBg')} />
                                    <PresetBtn themeColor="pink" onClick={() => applyPreset(PRESET_PROMPTS['preset.watermark'])} label={t('preset.watermark')} />
                                    <PresetBtn themeColor="pink" onClick={() => applyPreset(PRESET_PROMPTS['preset.text'])} label={t('preset.text')} />
                                    <PresetBtn themeColor="pink" onClick={() => applyPreset(PRESET_PROMPTS['preset.people'])} label={t('preset.people')} />
                                    <PresetBtn themeColor="pink" onClick={() => applyPreset(PRESET_PROMPTS['preset.object'])} label={t('preset.object')} />
                                    <PresetBtn themeColor="pink" onClick={() => applyPreset(PRESET_PROMPTS['preset.transparent'])} label={t('preset.transparent')} />
                                </>
                            )}
                            {activeTool === 'style' && (
                                <>
                                    <PresetBtn themeColor="blue" onClick={() => applyPreset(PRESET_PROMPTS['preset.vintage'])} label={t('preset.vintage')} />
                                    <PresetBtn themeColor="blue" onClick={() => applyPreset(PRESET_PROMPTS['preset.hdr'])} label={t('preset.hdr')} />
                                    <PresetBtn themeColor="blue" onClick={() => applyPreset(PRESET_PROMPTS['preset.warm'])} label={t('preset.warm')} />
                                    <PresetBtn themeColor="blue" onClick={() => applyPreset(PRESET_PROMPTS['preset.cool'])} label={t('preset.cool')} />
                                    <PresetBtn themeColor="blue" onClick={() => applyPreset(PRESET_PROMPTS['preset.sharp'])} label={t('preset.sharp')} />
                                    <PresetBtn themeColor="blue" onClick={() => applyPreset(PRESET_PROMPTS['preset.fixLight'])} label={t('preset.fixLight')} />
                                    <PresetBtn themeColor="blue" onClick={() => applyPreset(PRESET_PROMPTS['preset.vibrant'])} label={t('preset.vibrant')} />
                                    <PresetBtn themeColor="blue" onClick={() => applyPreset(PRESET_PROMPTS['preset.bw'])} label={t('preset.bw')} />
                                </>
                            )}
                            {activeTool === 'upscale' && (
                                <>
                                    <PresetBtn themeColor="amber" onClick={() => applyPreset(PRESET_PROMPTS['preset.4k'])} label={t('preset.4k')} />
                                    <PresetBtn themeColor="amber" onClick={() => applyPreset(PRESET_PROMPTS['preset.portrait'])} label={t('preset.portrait')} />
                                    <PresetBtn themeColor="amber" onClick={() => applyPreset(PRESET_PROMPTS['preset.restore'])} label={t('preset.restore')} />
                                    <PresetBtn themeColor="amber" onClick={() => applyPreset(PRESET_PROMPTS['preset.illus'])} label={t('preset.illus')} />
                                </>
                            )}
                            {activeTool === 'analyze' && (
                                <>
                                    <PresetBtn themeColor="emerald" onClick={() => applyPreset(PRESET_PROMPTS['preset.analyze.general'])} label={t('preset.analyze.general')} />
                                    <PresetBtn themeColor="emerald" onClick={() => applyPreset(PRESET_PROMPTS['preset.analyze.objects'])} label={t('preset.analyze.objects')} />
                                    <PresetBtn themeColor="emerald" onClick={() => applyPreset(PRESET_PROMPTS['preset.analyze.text'])} label={t('preset.analyze.text')} />
                                    <PresetBtn themeColor="emerald" onClick={() => applyPreset(PRESET_PROMPTS['preset.analyze.marketing'])} label={t('preset.analyze.marketing')} />
                                </>
                            )}
                            </div>
                    </div>

                    {activeTool === 'analyze' && analysis && (
                        <div className="space-y-4">
                            <div className="p-3 bg-surface rounded-lg border border-zinc-200 dark:border-white/5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-h-48 md:max-h-96 overflow-y-auto">
                                {analysis}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-3 md:p-5 border-t border-zinc-200 dark:border-white/5 bg-surface/50 flex gap-3">
                    <Button 
                        onClick={handleReset} 
                        disabled={!canReset}
                        className={`flex-1 ${
                            canReset 
                            ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 shadow-sm border' 
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-700'
                        }`}
                        icon={<RotateCcw className="w-4 h-4" />}
                    >
                        {t('prop.reset')}
                    </Button>
                    <Button 
                        onClick={processImage} 
                        isLoading={isProcessing} 
                        disabled={!originalImage}
                        className="flex-[2] shadow-lg shadow-primary/20"
                    >
                        {activeTool === 'analyze' ? t('prop.analyzeBtn') : t('prop.generate')}
                    </Button>
                </div>
            </div>

            {/* Main Canvas (Desktop: Right, Landscape: Right, Portrait: Top) */}
            <div className="
                row-start-1 mobile-landscape:col-start-2 lg:col-start-3 lg:row-start-1
                bg-surface relative overflow-hidden flex items-center justify-center transition-colors duration-300 h-full w-full
            ">
                {/* Dynamic Checkered Background using CSS vars for transparency */}
                <div className="absolute inset-0 opacity-10 dark:opacity-20" 
                    style={{ 
                        backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%), linear-gradient(45deg, transparent 75%, currentColor 75%), linear-gradient(-45deg, transparent 75%, currentColor 75%)',
                        backgroundSize: '24px 24px',
                        backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px',
                        color: 'rgb(var(--text-muted))'
                    }}
                ></div>

                {/* Full Canvas Loading Overlay */}
                {isProcessing && (
                    <div className="absolute inset-0 bg-surface/80 dark:bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-fade-in">
                        <div className="text-center p-8">
                            <div className="relative w-20 h-20 mb-6 mx-auto">
                                {/* Background Ring */}
                                <div className="absolute inset-0 border-[6px] border-zinc-200 dark:border-zinc-800 rounded-full"></div>
                                {/* Spinning Ring */}
                                <div className="absolute inset-0 border-[6px] border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                                {/* Icon Center */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {activeTool === 'analyze' ? (
                                        <ScanEye className="w-8 h-8 text-primary animate-pulse" />
                                    ) : (
                                        <Wand2 className="w-8 h-8 text-primary animate-pulse" />
                                    )}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t('workspace.loading')}</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs mx-auto animate-pulse">
                                {activeTool === 'analyze' ? 'Analyzing visual data...' : 'Generating pixel perfection...'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Empty State / Image Area */}
                {originalImage ? (
                    <div 
                        className={`relative z-10 max-w-[90%] max-h-[85%] shadow-2xl shadow-black/20 dark:shadow-black rounded-lg overflow-hidden select-none group bg-surfaceHighlight dark:bg-black ${activeTool === 'bg' ? 'cursor-none' : ''}`}
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleMouseMove}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseLeave={(e) => {
                            stopDrawing();
                            setShowBrush(false);
                        }}
                        onTouchStart={startDrawing}
                        onTouchEnd={stopDrawing}
                        onMouseEnter={() => setShowBrush(true)}
                    >
                        <img 
                            ref={imgRef}
                            src={originalImage} 
                            alt="Original" 
                            className="max-h-[50vh] mobile-landscape:max-h-[85vh] md:max-h-[80vh] w-auto object-contain block relative z-0"
                            draggable={false}
                        />

                        {processedImage && (
                            <div 
                                className="absolute inset-0 overflow-hidden border-r border-white/50 bg-black/5 z-20"
                                style={{ width: activeTool === 'bg' ? '100%' : `${comparePosition}%` }}
                            >
                                <img 
                                    src={processedImage} 
                                    alt="Processed" 
                                    className="h-full w-auto max-w-none object-contain"
                                    style={{ width: containerRef.current?.offsetWidth }}
                                    draggable={false}
                                />
                            </div>
                        )}
                        
                        {/* Mask Drawing Canvas Overlay - High z-index to stay on top of processed image for cumulative edits */}
                        {activeTool === 'bg' && (
                            <canvas 
                                ref={maskCanvasRef}
                                className="absolute inset-0 touch-none pointer-events-none z-30"
                            />
                        )}

                        {/* Slider Handle (Only when processed AND not in BG tool) */}
                        {processedImage && activeTool !== 'bg' && (
                            <div 
                                className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(0,0,0,0.5)] z-40 flex items-center justify-center"
                                style={{ left: `${comparePosition}%` }}
                            >
                                <div className="w-8 h-8 bg-white text-zinc-900 rounded-full shadow-xl flex items-center justify-center -ml-0.5 transform transition-transform hover:scale-110 active:scale-95">
                                    <RefreshCcw className="w-4 h-4" />
                                </div>
                            </div>
                        )}

                        {/* Brush Cursor Overlay (Only when using Smart Remove) */}
                        {activeTool === 'bg' && showBrush && !isDrawing && (
                            <div 
                                className="absolute border-2 border-white bg-white/30 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 shadow-sm z-50"
                                style={{ 
                                    left: cursorPos.x, 
                                    top: cursorPos.y, 
                                    width: `${brushSize}px`, 
                                    height: `${brushSize}px`,
                                    mixBlendMode: 'difference'
                                }}
                            ></div>
                        )}
                    </div>
                ) : (
                    // Empty Workspace State - With Discovery Cards
                    <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl px-4 animate-fade-in">
                        <div 
                            className="group flex flex-col items-center justify-center p-8 md:p-12 border-2 border-dashed border-zinc-200 dark:border-white/10 rounded-3xl w-full cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 hover:border-primary/50 transition-all mb-8 bg-white/50 dark:bg-surface/50 backdrop-blur-sm"
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8 text-zinc-400 dark:text-zinc-300 group-hover:text-primary" />
                            </div>
                            <p className="text-lg font-medium text-zinc-600 dark:text-zinc-300 mb-2">{t('workspace.uploadNew')}</p>
                            <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-6">{t('upload.desc')}</p>
                            <Button variant="primary" className="shadow-lg shadow-primary/20">{t('upload.btn')}</Button>
                        </div>

                        {/* Discovery Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                            <div className="p-4 rounded-xl bg-white/50 dark:bg-surface/50 border border-zinc-200 dark:border-white/5 hover:border-purple-500/50 hover:bg-purple-50 dark:hover:bg-purple-900/10 cursor-pointer transition-all group">
                                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                                    <Wand2 className="w-4 h-4" />
                                </div>
                                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">{t('workspace.discovery.templates')}</h4>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{t('workspace.discovery.templates.desc')}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/50 dark:bg-surface/50 border border-zinc-200 dark:border-white/5 hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 cursor-pointer transition-all group">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">{t('workspace.discovery.inspiration')}</h4>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{t('workspace.discovery.inspiration.desc')}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/50 dark:bg-surface/50 border border-zinc-200 dark:border-white/5 hover:border-amber-500/50 hover:bg-amber-50 dark:hover:bg-amber-900/10 cursor-pointer transition-all group">
                                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                                    <ScanEye className="w-4 h-4" />
                                </div>
                                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">{t('workspace.discovery.tutorials')}</h4>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{t('workspace.discovery.tutorials.desc')}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {error && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-6 py-3 rounded-lg backdrop-blur-md shadow-xl text-sm font-medium z-50">
                        {error}
                    </div>
                )}
            </div>
        </div>
        </div>
      )}
    </>
  );
};

const ToolButton = ({ icon, label, active, onClick, activeColor }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, activeColor: string }) => (
    <button 
        onClick={onClick}
        className={`w-10 h-10 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-200 group relative ${active ? `${activeColor} text-white shadow-lg` : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white'}`}
    >
        {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
        {/* Tooltip visible only on desktop */}
        <span className="hidden lg:block absolute left-14 bg-zinc-800 dark:bg-black px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 z-50">
            {label}
        </span>
    </button>
);

const PresetBtn = ({ label, onClick, themeColor }: { label: string, onClick: () => void, themeColor?: string }) => {
    // Dynamic theme classes
    const themeClasses: Record<string, string> = {
        purple: 'hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 hover:border-purple-200 dark:hover:border-purple-800 active:bg-purple-200 dark:active:bg-purple-800',
        pink: 'hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-700 dark:hover:text-pink-300 hover:border-pink-200 dark:hover:border-pink-800 active:bg-pink-200 dark:active:bg-pink-800',
        blue: 'hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-200 dark:hover:border-blue-800 active:bg-blue-200 dark:active:bg-blue-800',
        amber: 'hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-200 dark:hover:border-amber-800 active:bg-amber-200 dark:active:bg-amber-800',
        emerald: 'hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-200 dark:hover:border-emerald-800 active:bg-emerald-200 dark:active:bg-emerald-800',
    };

    const activeThemeClass = themeColor ? themeClasses[themeColor] : 'hover:bg-zinc-200 dark:hover:bg-white/10';

    return (
        <button 
            onClick={onClick}
            className={`p-2 md:p-2.5 rounded-lg border border-zinc-200 dark:border-white/5 bg-surfaceHighlight text-xs text-zinc-700 dark:text-zinc-300 text-left transition-all active:scale-95 mobile-landscape:min-w-[120px] mobile-landscape:flex-shrink-0 mobile-landscape:text-center ${activeThemeClass} focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-current`}
        >
            {label}
        </button>
    );
};

const Tag = ({ label, color }: { label: string, color: string }) => {
    // Basic color mapping for tailwind classes (simplistic for this demo)
    const colors: Record<string, string> = {
        emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
        violet: 'bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400',
        amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
        rose: 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400',
        sky: 'bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400',
        orange: 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400',
        indigo: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400',
        lime: 'bg-lime-500/10 text-lime-600 border-lime-500/20 dark:text-lime-400',
    };
    return (
        <span className={`px-3 py-1.5 md:px-4 md:py-2 border rounded-lg text-xs font-medium transition-colors cursor-default ${colors[color]}`}>
            {label}
        </span>
    );
};
