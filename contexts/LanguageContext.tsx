
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'zh' | 'ms' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar Main
    'nav.studio': 'Studio',
    'nav.features': 'Features',
    'nav.tutorials': 'Tutorials',
    'nav.resources': 'Resources',
    'nav.about': 'About',
    'nav.support': 'Support Us',
    'nav.github': 'GitHub',
    'nav.back': 'Back to Home',

    // Nav Dropdowns
    'nav.feat.magic': 'Magic Edit',
    'nav.feat.remove': 'Smart Remove',
    'nav.feat.style': 'Style Transfer',
    'nav.feat.upscale': 'Smart Upscale',
    'nav.feat.vision': 'Vision Analysis',
    
    'nav.tut.start': 'Quick Start',
    'nav.tut.tool': 'By Tool',
    'nav.tut.industry': 'By Industry',
    
    'nav.res.prompt': 'Prompt Library',
    'nav.res.showcase': 'Showcase',
    'nav.res.blog': 'Blog',

    // Hero
    'hero.poweredBy': 'Powered by Gemini 2.5 Flash',
    'hero.titleLine1': 'Empowering everyone',
    'hero.titleLine2': 'to create professional images',
    'hero.subtitle': 'Kawada Ai Studio is designed for the public. Whether you are an e-commerce seller, student, photographer, hawker, marketer, or creator, you can create high-quality assets easily.',
    'hero.fast': 'Lightning Fast',
    'hero.ai': 'AI Generation',
    'hero.vision': 'Vision Analysis',

    // Editor - Upload
    'upload.title': 'Upload your asset',
    'upload.desc': 'Drag and drop or click to browse.\nSupports JPG, PNG, WEBP up to 5MB.',
    'upload.btn': 'Select File',
    'upload.designedFor': 'Designed for',
    'upload.tag.ecommerce': 'E-Commerce',
    'upload.tag.game': 'Game Assets',
    'upload.tag.marketing': 'Marketing',
    'upload.tag.photo': 'Photography',
    'upload.tag.social': 'Content Creators',
    'upload.tag.fnb': 'F&B / Hawkers',
    'upload.tag.realestate': 'Real Estate',
    'upload.tag.education': 'Students',

    // Editor - Workspace
    'workspace.title': 'Workspace',
    'workspace.export': 'Export',
    'workspace.loading': 'Processing...',
    'workspace.error': 'Processing failed. Please try again.',
    'workspace.sizeError': 'File size too large. Limit is 5MB.',
    'workspace.compare': 'Drag to compare',
    'workspace.uploadNew': 'Upload Image',
    'workspace.emptyState': 'No image loaded. Upload an asset to apply the preset.',
    'workspace.discovery.templates': 'Templates',
    'workspace.discovery.templates.desc': 'Browse 50+ ready-to-use presets',
    'workspace.discovery.tutorials': 'Tutorials',
    'workspace.discovery.tutorials.desc': 'Learn how to edit in 3 mins',
    'workspace.discovery.inspiration': 'Inspiration',
    'workspace.discovery.inspiration.desc': 'Explore community creations',

    // Tools
    'tool.magic': 'Magic',
    'tool.removeBg': 'Smart Remove',
    'tool.style': 'Style',
    'tool.upscale': 'Upscale',
    'tool.analyze': 'Analyze',

    // Tool Headers
    'header.magic': 'Magic Edit',
    'header.bg': 'Smart Removal',
    'header.style': 'Enhance',
    'header.upscale': 'Upscale',
    'header.analyze': 'Vision Analysis',

    // Properties
    'prop.prompt': 'Prompt',
    'prop.placeholder': 'Describe the changes...',
    'prop.presets': 'Quick Presets',
    'prop.analyzeDesc': 'Gemini will analyze the visual content and provide a detailed description.',
    'prop.generate': 'Generate',
    'prop.reset': 'Reset',
    'prop.analyzeBtn': 'Analyze Asset',
    'prop.brushSize': 'Brush Size',
    'prop.clearMask': 'Clear Mask',
    
    // Presets Labels - Magic
    'preset.cyberpunk': 'Cyberpunk',
    'preset.3drender': '3D Render',
    'preset.vector': 'Vector',
    'preset.cinematic': 'Cinematic',
    'preset.bluesky': 'Blue Sky',
    'preset.sunset': 'Sunset',
    'preset.winter': 'Winter Snow',
    'preset.suit': 'Business Suit',
    'preset.smile': 'Make Smile',
    'preset.glasses': 'Add Glasses',
    'preset.anime': 'Anime Style',
    'preset.sketch': 'Pencil Sketch',

    // Presets Labels - Remove
    'preset.whiteBg': 'Remove BG',
    'preset.watermark': 'Watermark',
    'preset.text': 'Remove Text',
    'preset.people': 'Remove People',
    'preset.object': 'Magic Eraser',
    'preset.transparent': 'Transparent',

    // Presets Labels - Style
    'preset.sharp': 'Sharp',
    'preset.fixLight': 'Fix Light',
    'preset.vibrant': 'Vibrant',
    'preset.bw': 'B&W',
    'preset.vintage': 'Vintage Film',
    'preset.hdr': 'HDR Pop',
    'preset.warm': 'Warm Tone',
    'preset.cool': 'Cool Tone',

    // Presets Labels - Upscale
    'preset.4k': '4K Ultra',
    'preset.portrait': 'Portrait',
    'preset.restore': 'Restoration',
    'preset.illus': 'Illustration',
    
    // Analyze Presets Labels
    'preset.analyze.general': 'Detailed Description',
    'preset.analyze.objects': 'List Objects',
    'preset.analyze.text': 'Extract Text',
    'preset.analyze.marketing': 'Marketing Tags',

    // Preset Descriptions
    'preset.cyberpunk.desc': 'Transforms scenes with neon lights, high contrast, and futuristic sci-fi aesthetics.',
    'preset.3drender.desc': 'Converts flat images into stylized 3D assets suitable for game icons or mockups.',
    'preset.vector.desc': 'Simplifies the image into clean, flat vector art lines perfect for logos or illustrations.',
    'preset.cinematic.desc': 'Adds dramatic lighting, depth of field, and movie-grade color grading.',
    'preset.whiteBg.desc': 'Isolates the subject on a pure white background.',
    'preset.watermark.desc': 'Intelligently detects and removes watermarks or logos.',
    'preset.text.desc': 'Cleans up subtitles, captions, or other unwanted text overlays.',
    'preset.people.desc': 'Removes tourists or passersby from travel photos.',
    'preset.object.desc': 'Acts as a magic eraser to remove unwanted objects described in the prompt.',
    'preset.transparent.desc': 'Removes the background completely, leaving a transparent PNG.',
    'preset.sharp.desc': 'General enhancement to increase sharpness and clarity.',
    'preset.fixLight.desc': 'Balances exposure and corrects shadows for a balanced look.',
    'preset.vibrant.desc': 'Boosts saturation and vibrancy for a punchy, energetic look.',
    'preset.bw.desc': 'Converts to high-contrast, artistic black and white.',
    'preset.4k.desc': 'Upscales resolution to 4K while hallucinating missing details.',
    'preset.portrait.desc': 'Optimized for faces, smoothing skin and sharpening eyes.',
    'preset.restore.desc': 'Removes noise and artifacts from old or low-quality images.',
    'preset.illus.desc': 'Enhances lines and colors to look like a high-quality digital illustration.',
    'preset.analyze.general.desc': 'Provides a comprehensive caption of the entire image scene.',
    'preset.analyze.objects.desc': 'Identifies and lists all major items visible in the frame.',
    'preset.analyze.text.desc': 'OCR capability to read and extract text from the image.',
    'preset.analyze.marketing.desc': 'Generates SEO keywords and hashtags for social media.',

    // Guide Section
    'guide.title': 'Master the Studio',
    'guide.subtitle': 'Learn how to use our AI tools effectively. Click a card to explore.',
    'guide.magic.title': 'Magic Edit',
    'guide.magic.desc': 'Generative AI transformations.',
    'guide.bg.title': 'Smart Remove',
    'guide.bg.desc': 'Clean up watermarks, text, & objects.',
    'guide.style.title': 'Style Transfer',
    'guide.style.desc': 'Artistic mood changes.',
    'guide.upscale.title': 'Smart Upscale',
    'guide.upscale.desc': 'Resolution enhancement.',
    'guide.vision.title': 'Vision Analysis',
    'guide.vision.desc': 'Understand your images.',
    'guide.arrow.next': 'Next: Select Preset',
    
    // Guide Workflow
    'guide.workflow.title': 'How to use',
    'guide.workflow.step1': 'Step 1: Upload Asset',
    'guide.workflow.step1.desc': 'Upload your photo first to unlock the full creative workspace and tools.',
    'guide.workflow.step1.hint': '(Upload to Unlock)',
    'guide.workflow.step2': 'Step 2: Workspace',
    'guide.workflow.step2.desc': 'The studio opens automatically. Select a preset from the right to apply instant magic.',
    'guide.presets.title': 'Preset Command Center',

    // Footer Headers
    'footer.product': 'AI Tools',
    'footer.learn': 'Learn',
    'footer.company': 'Company',

    // Footer Links
    'footer.rights': '© 2025 Kawada Ai & IT Solution. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact',
    
    // Pages
    'page.privacy.title': 'Privacy Policy',
    'page.terms.title': 'Terms of Service',
    'page.contact.title': 'Contact Us',
    'page.about.title': 'About Us',
    'page.contact.subtitle': 'Have questions or feedback? We\'d love to hear from you.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.success': 'Message sent successfully!',
    
    // Contact Page Content
    'contact.getInTouch': 'Get in Touch',
    'contact.desc': 'We are here to help you with any questions about our AI tools, pricing, or enterprise solutions.',
    'contact.sent.title': 'Message Sent!',
    'contact.sent.desc': 'We will get back to you shortly.',

    // About Page
    'about.desc': 'Kawada Ai Studio (KAS) was born from a simple yet powerful vision: AI should improve the daily life of every ordinary person. The story began with our founder\'s early life on an island. When he eventually returned to his hometown, he discovered an invisible wall standing between rapidly advancing AI technology and the general public. From that day on, we have dedicated ourselves to breaking down this wall. Our mission is to transform complex AI into a tool as accessible as island sunshine—empowering hawkers, students, and creators alike to enjoy the benefits of technology equally.',
    'about.mission': 'Our Mission',
    'about.mission.text': 'To provide free, high-quality AI education and tools that empower everyone to create.',
    'about.community': 'Community Driven',
    'about.community.text': 'Built for hawkers, students, and creators.',
    'about.education': 'Free Education',
    'about.education.text': 'Democratizing AI skills for everyone.',
    'about.vision': 'Our Vision',
    'about.vision.text': 'To build a world where creativity has no boundaries. We envision a future where advanced AI technology is as common and easy to use as electricity.',

    // Features Page
    'feat.hero.title': 'Make every tool simple',
    'feat.hero.subtitle': '5 powerful AI tools providing the easiest image solutions for work and daily life.',
    'feat.card.magic.desc': 'Modify, replace, and expand images in one step.',
    'feat.card.remove.desc': 'Remove unwanted objects or text instantly.',
    'feat.card.style.desc': 'One-click image style transformation.',
    'feat.card.upscale.desc': 'Fix blur and reconstruct old photos.',
    'feat.card.vision.desc': 'Let AI analyze and understand your images.',
    'feat.card.cta': 'View Details',
    
    'feat.table.col.use': 'Use Case',
    'feat.table.col.magic': 'Magic Edit',
    'feat.table.col.remove': 'Smart Remove',
    'feat.table.col.style': 'Style Transfer',
    'feat.table.col.upscale': 'Smart Upscale',
    'feat.table.col.vision': 'Vision Analysis',
    
    'feat.table.row.core': 'Core Ability',
    'feat.table.row.pain': 'Pain Point',
    'feat.table.row.scene': 'Scenario',
    
    'feat.table.magic.core': 'Generative Edit',
    'feat.table.magic.pain': 'Modify elements',
    'feat.table.magic.scene': 'Swap backgrounds',
    
    'feat.table.remove.core': 'Object Erasure',
    'feat.table.remove.pain': 'Unwanted clutter',
    'feat.table.remove.scene': 'Remove strangers',
    
    'feat.table.style.core': 'Artistic Transfer',
    'feat.table.style.pain': 'Boring photos',
    'feat.table.style.scene': 'Photo to Anime',
    
    'feat.table.upscale.core': 'Enhancement',
    'feat.table.upscale.pain': 'Blurry images',
    'feat.table.upscale.scene': 'Print / Old Photos',
    
    'feat.table.vision.core': 'Visual Recog',
    'feat.table.vision.pain': 'Extract info',
    'feat.table.vision.scene': 'Marketing Copy',
    
    'feat.cta.title': 'Start your image creation',
    'feat.cta.btn': 'Open Kawada Ai Studio',
    'feat.cta.sub': 'Free to use, no registration required.',

    // Showcase
    'showcase.hero.title': 'Community Showcase',
    'showcase.hero.subtitle': 'Explore amazing creations from the Kawada Ai Studio community. Get inspired and create your own.',
    'showcase.filter.all': 'All',
    'showcase.filter.portrait': 'Portrait',
    'showcase.filter.product': 'Product',
    'showcase.filter.landscape': 'Landscape',
    'showcase.filter.creative': 'Creative',
    'showcase.card.after': 'After',
    'showcase.card.before': 'Before',
    'showcase.card.try': 'Try this',

    // Privacy Policy Content
    'privacy.lastUpdated': 'Last updated: January 2025',
    'privacy.intro.title': '1. Introduction',
    'privacy.intro.text': 'Welcome to Ken Ai Studio. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.',
    'privacy.data.title': '2. Data We Collect',
    'privacy.data.text': 'We may collect, use, store and transfer different kinds of personal data about you:',
    'privacy.data.list1': 'Identity Data: includes first name, last name, username.',
    'privacy.data.list2': 'Contact Data: includes email address and telephone numbers.',
    'privacy.data.list3': 'Technical Data: includes internet protocol (IP) address, browser type.',
    'privacy.use.title': '3. How We Use Your Data',
    'privacy.use.text': 'We will only use your personal data when the law allows us to, such as to perform the contract or for legitimate interests.',
    'privacy.security.title': '4. Data Security',
    'privacy.security.text': 'We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way.',
    'privacy.contact.title': '5. Contact Us',
    'privacy.contact.text': 'If you have any questions about this privacy policy, please contact us.',

    // Terms of Service Content
    'terms.lastUpdated': 'Last updated: January 2025',
    'terms.agreement.title': '1. Agreement to Terms',
    'terms.agreement.text': 'By accessing or using Ken Ai Studio, you agree to be bound by these Terms of Service.',
    'terms.ip.title': '2. Intellectual Property',
    'terms.ip.text': 'The Service and its original content are the exclusive property of Ken Ai Studio. You retain all rights to the images you upload.',
    'terms.accounts.title': '3. User Accounts',
    'terms.accounts.text': 'You must provide accurate information when creating an account. Failure to do so constitutes a breach of the Terms.',
    'terms.limits.title': '4. Usage Limits',
    'terms.limits.text': 'You agree not to misuse our services. We reserve the right to limit resources at our discretion.',
    'terms.termination.title': '5. Termination',
    'terms.termination.text': 'We may terminate or suspend access to our Service immediately, without prior notice, for any reason whatsoever.',
    'terms.changes.title': '6. Changes',
    'terms.changes.text': 'We reserve the right to modify or replace these Terms at any time.',
  },
  zh: {
    // Navbar
    'nav.studio': '工作台',
    'nav.features': '功能',
    'nav.tutorials': '教程',
    'nav.resources': '资源',
    'nav.about': '关于',
    'nav.support': '支持我们',
    'nav.github': 'GitHub',
    'nav.back': '返回首页',

    // Dropdowns
    'nav.feat.magic': '魔法编辑',
    'nav.feat.remove': '智能消除',
    'nav.feat.style': '风格迁移',
    'nav.feat.upscale': '智能超分',
    'nav.feat.vision': '视觉分析',
    
    'nav.tut.start': '快速入门',
    'nav.tut.tool': '按工具学习',
    'nav.tut.industry': '按行业学习',
    
    'nav.res.prompt': '提示词库',
    'nav.res.showcase': '案例展示',
    'nav.res.blog': '博客',

    // Footer Headers
    'footer.product': 'AI 工具',
    'footer.learn': '学习',
    'footer.company': '公司',

    // Hero
    'hero.poweredBy': '由 Gemini 2.5 Flash 驱动',
    'hero.titleLine1': '让每个人都能',
    'hero.titleLine2': '轻松创造专业图像',
    'hero.subtitle': 'Kawada Ai Studio 是一个为大众打造的 AI 图像编辑平台。无论你是电商卖家、学生、摄影师、小贩、营销人员或创作者，都能利用它。',
    'hero.fast': '闪电极速',
    'hero.ai': 'AI 生成',
    'hero.vision': '视觉分析',

    // Editor - Upload
    'upload.title': '上传您的素材',
    'upload.desc': '拖放或点击浏览。\n支持 JPG, PNG, WEBP (最大 5MB)。',
    'upload.btn': '选择文件',
    'upload.designedFor': '专为以下领域设计',
    'upload.tag.ecommerce': '电商',
    'upload.tag.game': '游戏资产',
    'upload.tag.marketing': '市场营销',
    'upload.tag.photo': '摄影',
    'upload.tag.social': '内容创作者',
    'upload.tag.fnb': '餐饮美食 / 小贩',
    'upload.tag.realestate': '房地产',
    'upload.tag.education': '学生 / 教育',

    // Editor - Workspace
    'workspace.title': '工作区',
    'workspace.export': '导出',
    'workspace.loading': '处理中...',
    'workspace.error': '处理失败，请重试。',
    'workspace.sizeError': '文件过大，限制为 5MB。',
    'workspace.compare': '拖动以对比',
    'workspace.uploadNew': '上传图片',
    'workspace.emptyState': '未加载图片。上传图片以应用预设。',
    'workspace.discovery.templates': '模板库',
    'workspace.discovery.templates.desc': '浏览 50+ 现成预设',
    'workspace.discovery.tutorials': '教程',
    'workspace.discovery.tutorials.desc': '3分钟学会编辑',
    'workspace.discovery.inspiration': '灵感库',
    'workspace.discovery.inspiration.desc': '探索社区作品',

    // Tools
    'tool.magic': '魔法编辑',
    'tool.removeBg': '智能消除',
    'tool.style': '风格化',
    'tool.upscale': '超分放大',
    'tool.analyze': '分析',

    // Tool Headers
    'header.magic': '魔法编辑',
    'header.bg': '智能消除',
    'header.style': '画质增强',
    'header.upscale': '超分放大',
    'header.analyze': '视觉分析',

    // Properties
    'prop.prompt': '提示词',
    'prop.placeholder': '描述您想要的修改...',
    'prop.presets': '快速预设',
    'prop.analyzeDesc': 'Gemini 将分析视觉内容并提供详细描述。',
    'prop.generate': '生成',
    'prop.reset': '重新开始',
    'prop.analyzeBtn': '分析素材',
    'prop.brushSize': '画笔大小',
    'prop.clearMask': '清除选区',
    
    // Presets Labels - Magic
    'preset.cyberpunk': '赛博朋克',
    'preset.3drender': '3D 渲染',
    'preset.vector': '矢量图',
    'preset.cinematic': '电影质感',
    'preset.bluesky': '蓝天白云',
    'preset.sunset': '日落黄昏',
    'preset.winter': '冬日雪景',
    'preset.suit': '商务西装',
    'preset.smile': '由哭变笑',
    'preset.glasses': '添加墨镜',
    'preset.anime': '动漫风格',
    'preset.sketch': '素描画',

    // Presets Labels - Remove
    'preset.whiteBg': '一键抠图',
    'preset.watermark': '消除水印',
    'preset.text': '消除文字',
    'preset.people': '消除路人',
    'preset.object': '魔法橡皮擦',
    'preset.transparent': '透明背景',

    // Presets Labels - Style
    'preset.sharp': '清晰锐化',
    'preset.fixLight': '光影修复',
    'preset.vibrant': '鲜艳色彩',
    'preset.bw': '黑白艺术',
    'preset.vintage': '复古胶片',
    'preset.hdr': 'HDR 增强',
    'preset.warm': '暖色调',
    'preset.cool': '冷色调',

    // Presets Labels - Upscale
    'preset.4k': '4K 超清',
    'preset.portrait': '人像增强',
    'preset.restore': '老照片修复',
    'preset.illus': '插画风格',
    
    // Analyze Presets
    'preset.analyze.general': '详细描述',
    'preset.analyze.objects': '列出物体',
    'preset.analyze.text': '提取文字',
    'preset.analyze.marketing': '营销标签',

    // Preset Descriptions
    'preset.cyberpunk.desc': '通过霓虹灯光和高对比度色彩，营造未来主义科幻氛围。',
    'preset.3drender.desc': '将平面图像转换为适合游戏图标或模型的 3D 风格资产。',
    'preset.vector.desc': '简化图像为干净、扁平的矢量线条，完美适用于 Logo 或插画。',
    'preset.cinematic.desc': '添加戏剧性光效、景深和电影级调色。',
    'preset.whiteBg.desc': '将主体提取并放置在纯白背景上。',
    'preset.watermark.desc': '智能识别并消除图像中的水印或 Logo。',
    'preset.text.desc': '清除字幕、标题或其他不需要的文字遮挡。',
    'preset.people.desc': '移除旅行照片中的游客或路人。',
    'preset.object.desc': '像魔法橡皮擦一样，根据提示词消除不需要的物体。',
    'preset.transparent.desc': '完全移除背景，生成透明 PNG 图像。',
    'preset.sharp.desc': '通用增强，提升整体清晰度和锐利度。',
    'preset.fixLight.desc': '平衡曝光，修正阴影，获得光影均衡的观感。',
    'preset.vibrant.desc': '提升饱和度和鲜艳度，打造充满活力的视觉效果。',
    'preset.bw.desc': '转换为高对比度的艺术黑白照片。',
    'preset.4k.desc': '将分辨率放大至 4K，智能补充缺失细节。',
    'preset.portrait.desc': '专为人像优化，平滑皮肤并锐化五官。',
    'preset.restore.desc': '去除老照片或低画质图像中的噪点和伪影。',
    'preset.illus.desc': '增强线条和色彩，呈现高质量数字插画风格。',
    'preset.analyze.general.desc': '生成图像场景的全面文字描述。',
    'preset.analyze.objects.desc': '识别并列出画面中所有可见的主要物体。',
    'preset.analyze.text.desc': 'OCR 功能，读取并提取图像中的文字内容。',
    'preset.analyze.marketing.desc': '生成适合社交媒体的 SEO 关键词和标签。',

    // Guide Section
    'guide.title': '玩转工作室',
    'guide.subtitle': '学习如何高效使用我们的 AI 工具。点击卡片查看详情。',
    'guide.magic.title': '魔法编辑',
    'guide.magic.desc': '生成式 AI 创意变换。',
    'guide.bg.title': '智能消除',
    'guide.bg.desc': '清除水印、文字与杂物。',
    'guide.style.title': '风格迁移',
    'guide.style.desc': '艺术氛围与光影调整。',
    'guide.upscale.title': '智能超分',
    'guide.upscale.desc': '4K 分辨率无损放大。',
    'guide.vision.title': '视觉分析',
    'guide.vision.desc': '深度理解图像内容。',
    'guide.arrow.next': '下一步：选择预设',

    // Guide Workflow
    'guide.workflow.title': '使用指南',
    'guide.workflow.step1': '第一步：上传素材',
    'guide.workflow.step1.desc': '上传照片后即刻解锁全功能工作台。',
    'guide.workflow.step1.hint': '（上传即开启）',
    'guide.workflow.step2': '第二步：工作台',
    'guide.workflow.step2.desc': '进入工作台后，从右侧选择预设，一键施展魔法。',
    'guide.presets.title': '预设指令中心',

    // Footer Links
    'footer.rights': '© 2025 Kawada Ai & IT Solution. 保留所有权利。',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.contact': '联系我们',

    // Pages
    'page.privacy.title': '隐私政策',
    'page.terms.title': '服务条款',
    'page.contact.title': '联系我们',
    'page.about.title': '关于我们',
    'page.contact.subtitle': '有问题或反馈？我们期待听到您的声音。',
    'contact.form.name': '姓名',
    'contact.form.email': '电子邮箱',
    'contact.form.message': '留言',
    'contact.form.send': '发送消息',
    'contact.success': '消息发送成功！',

    // Contact Page Content
    'contact.getInTouch': '取得联系',
    'contact.desc': '无论您对我们的 AI 工具有疑问，还是咨询定价或企业解决方案，我们随时为您提供帮助。',
    'contact.sent.title': '消息已发送！',
    'contact.sent.desc': '我们会尽快给您回复。',

    // About Page
    'about.desc': 'Kawada Ai Studio (KAS) 诞生于一个朴素却坚定的愿景：AI 不应高高在上，而应改善每一个普通人的日常生活。故事始于我们的创始人早年在岛屿上的生活经历。那里节奏缓慢，人情温暖。然而，当他多年后回到家乡，却敏锐地发觉，飞速发展的 AI 技术与普通大众之间，竖起了一道无形的墙。技术在狂奔，而许多人被留在了墙外。从那一天起，我们就致力于推倒这堵墙。我们希望将复杂的 AI 变成像岛屿阳光一样简单、普惠的工具，让小贩、学生、创作者——让每一个人，都能平等地享受科技带来的美好。',
    'about.mission': '我们的使命',
    'about.mission.text': '提供免费、高质量的 AI 教育，让每个人都能轻松掌握这些强大的工具。',
    'about.community': '社区驱动',
    'about.community.text': '专为小贩、学生和创作者打造。',
    'about.education': '免费教育',
    'about.education.text': '为每个人普及 AI 技能。',
    'about.vision': '我们的愿景',
    'about.vision.text': '建立一个创造力无国界的世界。我们设想这样一个未来：先进的 AI 技术就像电力一样普及和易用。',

    // Features Page
    'feat.hero.title': '让每个工具都简单易用',
    'feat.hero.subtitle': '5 大 AI 工具，为日常与工作提供最轻松的图像解决方案。',
    'feat.card.magic.desc': '修改、替换、扩图，一步完成',
    'feat.card.remove.desc': '删除不需要的物件或文字',
    'feat.card.style.desc': '一键转变图像风格',
    'feat.card.upscale.desc': '模糊变清晰，旧照重建',
    'feat.card.vision.desc': '让 AI 分析你的图像',
    'feat.card.cta': '查看详情',
    
    'feat.table.col.use': '用途',
    'feat.table.col.magic': '魔法编辑',
    'feat.table.col.remove': '智能消除',
    'feat.table.col.style': '风格迁移',
    'feat.table.col.upscale': '智能超分',
    'feat.table.col.vision': '视觉分析',
    
    'feat.table.row.core': '核心能力',
    'feat.table.row.pain': '解决痛点',
    'feat.table.row.scene': '典型场景',
    
    'feat.table.magic.core': '生成式编辑与重绘',
    'feat.table.magic.pain': '想要修改画面元素',
    'feat.table.magic.scene': '模特换装、背景替换',
    
    'feat.table.remove.core': '智能物体擦除',
    'feat.table.remove.pain': '画面有杂物或水印',
    'feat.table.remove.scene': '去除路人、去Logo',
    
    'feat.table.style.core': '艺术风格转换',
    'feat.table.style.pain': '想要独特的艺术效果',
    'feat.table.style.scene': '照片转动漫、素描',
    
    'feat.table.upscale.core': '画质增强与放大',
    'feat.table.upscale.pain': '图片模糊或尺寸太小',
    'feat.table.upscale.scene': '老照片修复、打印放大',
    
    'feat.table.vision.core': '视觉内容识别',
    'feat.table.vision.pain': '需要提取图片信息',
    'feat.table.vision.scene': '生成营销文案、OCR',
    
    'feat.cta.title': '立即开始你的图像创作',
    'feat.cta.btn': '打开 Kawada Ai Studio',
    'feat.cta.sub': '免费使用，无需注册。',

    // Showcase
    'showcase.hero.title': '社区案例展示',
    'showcase.hero.subtitle': '探索 Kawada Ai Studio 社区的精彩创作。汲取灵感，开始您的创作。',
    'showcase.filter.all': '全部',
    'showcase.filter.portrait': '人像',
    'showcase.filter.product': '产品',
    'showcase.filter.landscape': '风景',
    'showcase.filter.creative': '创意',
    'showcase.card.after': '处理后',
    'showcase.card.before': '原图',
    'showcase.card.try': '试用此模板',

    // Privacy Policy Content
    'privacy.lastUpdated': '最后更新：2025年1月',
    'privacy.intro.title': '1. 简介',
    'privacy.intro.text': '欢迎来到 Ken Ai Studio。我们尊重您的隐私并致力于保护您的个人数据。本隐私政策将告知您当我们访问我们的网站时我们如何处理您的个人数据。',
    'privacy.data.title': '2. 我们收集的数据',
    'privacy.data.text': '我们可能会收集、使用、存储和传输关于您的不同种类的个人数据：',
    'privacy.data.list1': '身份数据：包括名、姓、用户名。',
    'privacy.data.list2': '联系数据：包括电子邮件地址和电话号码。',
    'privacy.data.list3': '技术数据：包括互联网协议 (IP) 地址、浏览器类型。',
    'privacy.use.title': '3. 我们如何使用您的数据',
    'privacy.use.text': '我们只会在法律允许的情况下使用您的个人数据，例如为了履行合同或出于合法利益。',
    'privacy.security.title': '4. 数据安全',
    'privacy.security.text': '我们已采取适当的安全措施，防止您的个人数据意外丢失、使用或以未经授权的方式访问。',
    'privacy.contact.title': '5. 联系我们',
    'privacy.contact.text': '如果您对本隐私政策有任何疑问，请联系我们。',

    // Terms of Service Content
    'terms.lastUpdated': '最后更新：2025年1月',
    'terms.agreement.title': '1. 协议条款',
    'terms.agreement.text': '访问或使用 Ken Ai Studio，即表示您同意受这些服务条款的约束。',
    'terms.ip.title': '2. 知识产权',
    'terms.ip.text': '本服务及其原始内容是 Ken Ai Studio 的独家财产。您保留上传图像的所有权。',
    'terms.accounts.title': '3. 用户账户',
    'terms.accounts.text': '创建账户时，您必须提供准确的信息。否则即构成对条款的违反。',
    'terms.limits.title': '4. 使用限制',
    'terms.limits.text': '您同意不滥用我们的服务。我们保留自行决定限制资源的权利。',
    'terms.termination.title': '5. 终止',
    'terms.termination.text': '我们可能会出于任何原因立即终止或暂停对我们服务的访问，恕不另行通知。',
    'terms.changes.title': '6. 变更',
    'terms.changes.text': '我们保留随时修改或替换这些条款的权利。',
  },
  ms: {
    // Navbar
    'nav.studio': 'Studio',
    'nav.features': 'Ciri-ciri',
    'nav.tutorials': 'Tutorial',
    'nav.resources': 'Sumber',
    'nav.about': 'Tentang',
    'nav.support': 'Sokong Kami',
    'nav.github': 'GitHub',
    'nav.back': 'Kembali ke Utama',

    // Dropdowns
    'nav.feat.magic': 'Suntingan Magis',
    'nav.feat.remove': 'Penghapusan Pintar',
    'nav.feat.style': 'Gaya',
    'nav.feat.upscale': 'Penskalaan',
    'nav.feat.vision': 'Analisis',
    
    'nav.tut.start': 'Mula Pantas',
    'nav.tut.tool': 'Ikut Alat',
    'nav.tut.industry': 'Ikut Industri',
    
    'nav.res.prompt': 'Pustaka Prom',
    'nav.res.showcase': 'Pameran',
    'nav.res.blog': 'Blog',

    // Footer Headers
    'footer.product': 'Alat AI',
    'footer.learn': 'Belajar',
    'footer.company': 'Syarikat',

    // Hero
    'hero.poweredBy': 'Dikuasakan oleh Gemini 2.5 Flash',
    'hero.titleLine1': 'Memperkasakan semua orang untuk',
    'hero.titleLine2': 'mencipta imej profesional',
    'hero.subtitle': 'Kawada Ai Studio adalah platform AI untuk orang ramai. Sama ada anda penjual e-dagang, pelajar, jurugambar, penjaja, pemasar, atau pencipta, anda boleh gunakannya.',
    'hero.fast': 'Sangat Pantas',
    'hero.ai': 'Generasi AI',
    'hero.vision': 'Analisis Visual',

    // Editor - Upload
    'upload.title': 'Muat naik aset anda',
    'upload.desc': 'Seret dan lepas atau klik untuk semak imbas.\nMenyokong JPG, PNG, WEBP sehingga 5MB.',
    'upload.btn': 'Pilih Fail',
    'upload.designedFor': 'Direka untuk',
    'upload.tag.ecommerce': 'E-Dagang',
    'upload.tag.game': 'Aset Permainan',
    'upload.tag.marketing': 'Pemasaran',
    'upload.tag.photo': 'Fotografi',
    'upload.tag.social': 'Pencipta Kandungan',
    'upload.tag.fnb': 'Makanan (F&B) / Penjaja',
    'upload.tag.realestate': 'Hartanah',
    'upload.tag.education': 'Pelajar / Pendidikan',

    // Editor - Workspace
    'workspace.title': 'Ruang Kerja',
    'workspace.export': 'Eksport',
    'workspace.loading': 'Memproses...',
    'workspace.error': 'Pemprosesan gagal. Sila cuba lagi.',
    'workspace.sizeError': 'Saiz fail terlalu besar. Had ialah 5MB.',
    'workspace.compare': 'Seret untuk bandingkan',
    'workspace.uploadNew': 'Muat Naik Imej',
    'workspace.emptyState': 'Tiada imej dimuatkan. Muat naik aset untuk menggunakan pratetap.',
    'workspace.discovery.templates': 'Templat',
    'workspace.discovery.templates.desc': 'Layari 50+ pratetap siap',
    'workspace.discovery.tutorials': 'Tutorial',
    'workspace.discovery.tutorials.desc': 'Belajar sunting dalam 3 min',
    'workspace.discovery.inspiration': 'Inspirasi',
    'workspace.discovery.inspiration.desc': 'Teroka ciptaan komuniti',

    // Tools
    'tool.magic': 'Magis',
    'tool.removeBg': 'Penghapusan Pintar',
    'tool.style': 'Gaya',
    'tool.upscale': 'Penskalaan',
    'tool.analyze': 'Analisis',

    // Tool Headers
    'header.magic': 'Suntingan Magis',
    'header.bg': 'Penghapusan Pintar',
    'header.style': 'Penambahbaikan',
    'header.upscale': 'Penskalaan Imej',
    'header.analyze': 'Analisis Visual',

    // Properties
    'prop.prompt': 'Prom',
    'prop.placeholder': 'Terangkan perubahan...',
    'prop.presets': 'Pratetap Pantas',
    'prop.analyzeDesc': 'Gemini akan menganalisis kandungan visual dan memberikan penerangan terperinci.',
    'prop.generate': 'Jana',
    'prop.reset': 'Set Semula',
    'prop.analyzeBtn': 'Analisis Aset',
    'prop.brushSize': 'Saiz Berus',
    'prop.clearMask': 'Padam Pilihan',
    
    // Presets - Magic
    'preset.cyberpunk': 'Cyberpunk',
    'preset.3drender': 'Render 3D',
    'preset.vector': 'Vektor',
    'preset.cinematic': 'Sinematik',
    'preset.bluesky': 'Langit Biru',
    'preset.sunset': 'Matahari Terbenam',
    'preset.winter': 'Salji Musim Sejuk',
    'preset.suit': 'Kot Perniagaan',
    'preset.smile': 'Senyum',
    'preset.glasses': 'Cermin Mata',
    'preset.anime': 'Gaya Anime',
    'preset.sketch': 'Lakaran Pensel',

    // Presets - Remove
    'preset.whiteBg': 'Buang Latar',
    'preset.watermark': 'Buang Tera Air',
    'preset.text': 'Buang Teks',
    'preset.people': 'Buang Orang',
    'preset.object': 'Pemadam Magis',
    'preset.transparent': 'Latar Lutsinar',

    // Presets - Style
    'preset.studio': 'Studio',
    'preset.nature': 'Alam Semulajadi',
    'preset.sharp': 'Tajam',
    'preset.fixLight': 'Baiki Cahaya',
    'preset.vibrant': 'Warna Cerah',
    'preset.bw': 'Hitam & Putih',
    'preset.vintage': 'Filem Vintaj',
    'preset.hdr': 'Pop HDR',
    'preset.warm': 'Nada Hangat',
    'preset.cool': 'Nada Sejuk',

    // Presets - Upscale
    'preset.4k': '4K Ultra',
    'preset.portrait': 'Potret',
    'preset.restore': 'Pemulihan',
    'preset.illus': 'Ilustrasi',
    
    // Analyze Presets
    'preset.analyze.general': 'Penerangan Terperinci',
    'preset.analyze.objects': 'Senaraikan Objek',
    'preset.analyze.text': 'Ekstrak Teks',
    'preset.analyze.marketing': 'Tag Pemasaran',

    // Preset Descriptions (MS)
    'preset.cyberpunk.desc': 'Mengubah pemandangan dengan lampu neon dan estetika sci-fi futuristik.',
    'preset.3drender.desc': 'Menukar imej rata kepada aset 3D yang bergaya untuk ikon permainan.',
    'preset.vector.desc': 'Mempermudah imej menjadi seni vektor yang bersih dan rata.',
    'preset.cinematic.desc': 'Menambah pencahayaan dramatik dan gred warna gred filem.',
    'preset.whiteBg.desc': 'Mengasingkan subjek pada latar belakang putih tulen.',
    'preset.watermark.desc': 'Mengesan dan membuang tera air atau logo secara pintar.',
    'preset.text.desc': 'Membersihkan sari kata, kapsyen, atau teks lain yang tidak diingini.',
    'preset.people.desc': 'Membuang pelancong atau orang yang lalu lalang daripada foto perjalanan.',
    'preset.object.desc': 'Bertindak sebagai pemadam magis untuk membuang objek yang tidak diingini.',
    'preset.transparent.desc': 'Membuang latar belakang sepenuhnya, meninggalkan PNG telus.',
    'preset.studio.desc': 'Meletakkan produk dalam tetapan studio fotografi profesional.',
    'preset.nature.desc': 'Membawa subjek ke persekitaran semula jadi luar.',
    'preset.sharp.desc': 'Peningkatan umum untuk meningkatkan ketajaman dan kejelasan.',
    'preset.fixLight.desc': 'Mengimbangi pendedahan dan membetulkan bayang-bayang.',
    'preset.vibrant.desc': 'Meningkatkan ketepuan untuk rupa yang bertenaga.',
    'preset.bw.desc': 'Menukar kepada hitam dan putih artistik kontras tinggi.',
    'preset.4k.desc': 'Meningkatkan resolusi kepada 4K sambil menambah butiran.',
    'preset.portrait.desc': 'Dioptimumkan untuk wajah, melicinkan kulit dan menajamkan mata.',
    'preset.restore.desc': 'Membuang hingar daripada imej lama atau berkualiti rendah.',
    'preset.illus.desc': 'Meningkatkan garisan dan warna untuk kelihatan seperti ilustrasi digital.',
    'preset.analyze.general.desc': 'Memberikan kapsyen komprehensif bagi keseluruhan pemandangan.',
    'preset.analyze.objects.desc': 'Mengenal pasti dan menyenaraikan semua item utama yang kelihatan.',
    'preset.analyze.text.desc': 'Keupayaan OCR untuk membaca dan mengekstrak teks.',
    'preset.analyze.marketing.desc': 'Menjana kata kunci SEO dan tanda pagar untuk media sosial.',

    // Guide Section
    'guide.title': 'Kuasai Studio',
    'guide.subtitle': 'Ketahui cara menggunakan alat AI kami dengan berkesan. Klik kad untuk meneroka.',
    'guide.magic.title': 'Suntingan Magis',
    'guide.magic.desc': 'Transformasi AI generatif.',
    'guide.bg.title': 'Penghapusan Pintar',
    'guide.bg.desc': 'Bersihkan tera air, teks & objek.',
    'guide.style.title': 'Pemindahan Gaya',
    'guide.style.desc': 'Perubahan mood artistik.',
    'guide.upscale.title': 'Penskalaan Pintar',
    'guide.upscale.desc': 'Peningkatan resolusi.',
    'guide.vision.title': 'Analisis Visual',
    'guide.vision.desc': 'Fahami imej anda.',
    'guide.arrow.next': 'Seterusnya: Pilih Pratetap',

    // Guide Workflow
    'guide.workflow.title': 'Cara Penggunaan',
    'guide.workflow.step1': 'Langkah 1: Muat Naik Aset',
    'guide.workflow.step1.desc': 'Muat naik foto anda dahulu untuk membuka ruang kerja kreatif penuh dan alatan.',
    'guide.workflow.step1.hint': '(Muat naik untuk Buka)',
    'guide.workflow.step2': 'Langkah 2: Ruang Kerja',
    'guide.workflow.step2.desc': 'Studio akan dibuka secara automatik. Pilih pratetap dari sebelah kanan untuk menggunakan magis segera.',
    'guide.presets.title': 'Pusat Arahan Pratetap',

    // Footer
    'footer.rights': '© 2025 Kawada Ai & IT Solution. Hak cipta terpelihara.',
    'footer.privacy': 'Dasar Privasi',
    'footer.terms': 'Terma Perkhidmatan',
    'footer.contact': 'Hubungi Kami',

    // Pages
    'page.privacy.title': 'Dasar Privasi',
    'page.terms.title': 'Terma Perkhidmatan',
    'page.contact.title': 'Hubungi Kami',
    'page.about.title': 'Tentang Kami',
    'page.contact.subtitle': 'Ada soalan atau maklum balas? Kami ingin mendengar daripada anda.',
    'contact.form.name': 'Nama',
    'contact.form.email': 'Emel',
    'contact.form.message': 'Mesej',
    'contact.form.send': 'Hantar Mesej',
    'contact.success': 'Mesej berjaya dihantar!',

    // Contact Page Content
    'contact.getInTouch': 'Hubungi Kami',
    'contact.desc': 'Kami di sini untuk membantu anda dengan sebarang soalan mengenai alat AI kami, harga, atau penyelesaian perusahaan.',
    'contact.sent.title': 'Mesej Dihantar!',
    'contact.sent.desc': 'Kami akan membalas anda tidak lama lagi.',
    
    // About Page
    'about.desc': 'Kawada Ai Studio (KAS) lahir dari visi yang mudah namun berkuasa: AI seharusnya meningkatkan kehidupan seharian setiap orang biasa. Kisah ini bermula dengan kehidupan awal pengasas kami di sebuah pulau. Apabila beliau akhirnya kembali ke kampung halamannya, beliau mendapati satu tembok halimunan berdiri di antara teknologi AI yang berkembang pesat dan orang ramai. Sejak hari itu, kami telah mendedikasikan diri untuk meruntuhkan tembok ini. Misi kami adalah untuk mengubah AI yang kompleks menjadi alat yang semudah cahaya matahari di pulau—memperkasakan penjaja, pelajar, dan pencipta untuk menikmati manfaat teknologi secara saksama.',
    'about.mission': 'Misi Kami',
    'about.mission.text': 'Untuk merendahkan halangan masuk bagi kreativiti AI dan menyediakan pendidikan berkualiti tinggi percuma.',
    'about.community': 'Dipacu Komuniti',
    'about.community.text': 'Dibina untuk penjaja, pelajar, dan pencipta.',
    'about.education': 'Pendidikan Percuma',
    'about.education.text': 'Mendemokrasikan kemahiran AI untuk semua.',
    'about.vision': 'Visi Kami',
    'about.vision.text': 'Untuk membina dunia di mana kreativiti tiada sempadan. Kami membayangkan masa depan di mana teknologi AI canggih semudah digunakan seperti elektrik.',
    
    // Features Page (Malay)
    'feat.hero.title': 'Jadikan setiap alat mudah',
    'feat.hero.subtitle': '5 alat AI berkuasa untuk penyelesaian imej paling mudah bagi kerja dan harian.',
    'feat.card.magic.desc': 'Ubah suai, ganti, dan kembangkan imej dalam satu langkah.',
    'feat.card.remove.desc': 'Buang objek atau teks yang tidak diingini serta-merta.',
    'feat.card.style.desc': 'Transformasi gaya imej satu klik.',
    'feat.card.upscale.desc': 'Betulkan kabur dan bina semula foto lama.',
    'feat.card.vision.desc': 'Biarkan AI menganalisis dan memahami imej anda.',
    'feat.card.cta': 'Lihat Butiran',
    
    'feat.table.col.use': 'Kegunaan',
    'feat.table.col.magic': 'Suntingan Magis',
    'feat.table.col.remove': 'Penghapusan Pintar',
    'feat.table.col.style': 'Gaya',
    'feat.table.col.upscale': 'Penskalaan',
    'feat.table.col.vision': 'Analisis',
    
    'feat.table.row.core': 'Keupayaan Teras',
    'feat.table.row.pain': 'Masalah Diselesaikan',
    'feat.table.row.scene': 'Senario',
    
    'feat.table.magic.core': 'Suntingan Generatif',
    'feat.table.magic.pain': 'Ubah suai elemen',
    'feat.table.magic.scene': 'Tukar latar belakang',
    
    'feat.table.remove.core': 'Pemadam Objek',
    'feat.table.remove.pain': 'Kekusutan',
    'feat.table.remove.scene': 'Buang orang asing',
    
    'feat.table.style.core': 'Pemindahan Artistik',
    'feat.table.style.pain': 'Foto membosankan',
    'feat.table.style.scene': 'Foto ke Anime',
    
    'feat.table.upscale.core': 'Peningkatan',
    'feat.table.upscale.pain': 'Imej kabur',
    'feat.table.upscale.scene': 'Cetak / Foto Lama',
    
    'feat.table.vision.core': 'Pengiktirafan Visual',
    'feat.table.vision.pain': 'Ekstrak info',
    'feat.table.vision.scene': 'Salinan Pemasaran',
    
    'feat.cta.title': 'Mulakan ciptaan imej anda',
    'feat.cta.btn': 'Buka Kawada Ai Studio',
    'feat.cta.sub': 'Percuma untuk digunakan, tiada pendaftaran.',

    // Showcase
    'showcase.hero.title': 'Pameran Komuniti',
    'showcase.hero.subtitle': 'Terokai ciptaan menakjubkan dari komuniti Kawada Ai Studio.',
    'showcase.filter.all': 'Semua',
    'showcase.filter.portrait': 'Potret',
    'showcase.filter.product': 'Produk',
    'showcase.filter.landscape': 'Landskap',
    'showcase.filter.creative': 'Kreatif',
    'showcase.card.after': 'Selepas',
    'showcase.card.before': 'Sebelum',
    'showcase.card.try': 'Cuba ini',

    // Privacy Policy Content
    'privacy.lastUpdated': 'Terakhir dikemas kini: Januari 2025',
    'privacy.intro.title': '1. Pengenalan',
    'privacy.intro.text': 'Selamat datang ke Ken Ai Studio. Kami menghormati privasi anda dan komited untuk melindungi data peribadi anda. Dasar privasi ini akan memberitahu anda bagaimana kami menjaga data peribadi anda apabila anda melawat laman web kami.',
    'privacy.data.title': '2. Data Yang Kami Kumpul',
    'privacy.data.text': 'Kami mungkin mengumpul, menggunakan, menyimpan dan memindahkan pelbagai jenis data peribadi mengenai anda:',
    'privacy.data.list1': 'Data Identiti: termasuk nama pertama, nama akhir, nama pengguna.',
    'privacy.data.list2': 'Data Kenalan: termasuk alamat emel dan nombor telefon.',
    'privacy.data.list3': 'Data Teknikal: termasuk alamat protokol internet (IP), jenis pelayar.',
    'privacy.use.title': '3. Cara Kami Menggunakan Data Anda',
    'privacy.use.text': 'Kami hanya akan menggunakan data peribadi anda apabila undang-undang membenarkan kami, seperti untuk melaksanakan kontrak atau untuk kepentingan yang sah.',
    'privacy.security.title': '4. Keselamatan Data',
    'privacy.security.text': 'Kami telah melaksanakan langkah-langkah keselamatan yang sesuai untuk mengelakkan data peribadi anda daripada hilang secara tidak sengaja, digunakan atau diakses tanpa kebenaran.',
    'privacy.contact.title': '5. Hubungi Kami',
    'privacy.contact.text': 'Sekiranya anda mempunyai sebarang soalan mengenai dasar privasi ini, sila hubungi kami.',

    // Terms of Service Content
    'terms.lastUpdated': 'Terakhir dikemas kini: Januari 2025',
    'terms.agreement.title': '1. Persetujuan kepada Terma',
    'terms.agreement.text': 'Dengan mengakses atau menggunakan Ken Ai Studio, anda bersetuju untuk terikat dengan Terma Perkhidmatan ini.',
    'terms.ip.title': '2. Harta Intelek',
    'terms.ip.text': 'Perkhidmatan dan kandungan asalnya adalah harta eksklusif Ken Ai Studio. Anda mengekalkan semua hak ke atas imej yang anda muat naik.',
    'terms.accounts.title': '3. Akaun Pengguna',
    'terms.accounts.text': 'Anda mesti memberikan maklumat yang tepat semasa membuat akaun. Kegagalan berbuat demikian merupakan pelanggaran Terma.',
    'terms.limits.title': '4. Had Penggunaan',
    'terms.limits.text': 'Anda bersetuju untuk tidak menyalahgunakan perkhidmatan kami. Kami berhak mengehadkan sumber mengikut budi bicara kami.',
    'terms.termination.title': '5. Penamatan',
    'terms.termination.text': 'Kami boleh menamatkan atau menggantung akses ke Perkhidmatan kami dengan serta-merta, tanpa notis awal, atas sebarang sebab.',
    'terms.changes.title': '6. Perubahan',
    'terms.changes.text': 'Kami berhak mengubah suai atau menggantikan Terma ini pada bila-bila masa.',
  },
  hi: {
    // Navbar
    'nav.studio': 'स्टूडियो',
    'nav.features': 'विशेषताएं',
    'nav.tutorials': 'ट्यूटोरियल',
    'nav.resources': 'संसाधन',
    'nav.about': 'हमारे बारे में',
    'nav.support': 'हमारा समर्थन करें',
    'nav.github': 'GitHub',
    'nav.back': 'मुख्य पृष्ठ पर वापस जाएँ',

    // Dropdowns
    'nav.feat.magic': 'जादुई संपादन',
    'nav.feat.remove': 'स्मार्ट रिमूव',
    'nav.feat.style': 'शैली स्थानांतरण',
    'nav.feat.upscale': 'स्मार्ट अपस्केल',
    'nav.feat.vision': 'विज़न विश्लेषण',
    
    'nav.tut.start': 'त्वरित आरंभ',
    'nav.tut.tool': 'टूल द्वारा',
    'nav.tut.industry': 'उद्योग द्वारा',
    
    'nav.res.prompt': 'प्रॉम्प्ट लाइब्रेरी',
    'nav.res.showcase': 'शोकेस',
    'nav.res.blog': 'ब्लॉग',

    // Footer Headers
    'footer.product': 'AI टूल्स',
    'footer.learn': 'सीखें',
    'footer.company': 'कंपनी',

    // Hero
    'hero.poweredBy': 'Gemini 2.5 Flash द्वारा संचालित',
    'hero.titleLine1': 'हर किसी को सशक्त बनाना',
    'hero.titleLine2': 'पेशेवर चित्र बनाने के लिए',
    'hero.subtitle': 'Kawada Ai Studio जनता के लिए बनाया गया एक एआई मंच है। चाहे आप ई-कॉमर्स विक्रेता, छात्र, फोटोग्राफर, फेरीवाले, विपणक या निर्माता हों, आप इसका उपयोग कर सकते हैं।',
    'hero.fast': 'तेज़',
    'hero.ai': 'एआई जनरेशन',
    'hero.vision': 'विज़न विश्लेषण',

    // Editor - Upload
    'upload.title': 'अपनी संपत्ति अपलोड करें',
    'upload.desc': 'खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें।\nJPG, PNG, WEBP (अधिकतम 5MB) का समर्थन करता है।',
    'upload.btn': 'फ़ाइल चुनें',
    'upload.designedFor': 'के लिए डिज़ाइन किया गया',
    'upload.tag.ecommerce': 'ई-कॉमर्स',
    'upload.tag.game': 'गेम एसेट्स',
    'upload.tag.marketing': 'मार्केटिंग',
    'upload.tag.photo': 'फोटोग्राफी',
    'upload.tag.social': 'सामग्री निर्माता',
    'upload.tag.fnb': 'खाद्य और पेय / फेरीवाले',
    'upload.tag.realestate': 'रियल एस्टेट',
    'upload.tag.education': 'छात्र / शिक्षा',

    // Editor - Workspace
    'workspace.title': 'कार्यस्थान',
    'workspace.export': 'निर्यात',
    'workspace.loading': 'प्रक्रिया जारी है...',
    'workspace.error': 'प्रक्रिया विफल रही। कृपया पुनः प्रयास करें।',
    'workspace.sizeError': 'फ़ाइल बहुत बड़ी है। सीमा 5MB है।',
    'workspace.compare': 'तुलना करने के लिए खींचें',
    'workspace.uploadNew': 'छवि अपलोड करें',
    'workspace.emptyState': 'कोई छवि लोड नहीं है। प्रीसेट लागू करने के लिए संपत्ति अपलोड करें।',
    'workspace.discovery.templates': 'टेम्पलेट्स',
    'workspace.discovery.templates.desc': '50+ तैयार प्रीसेट',
    'workspace.discovery.tutorials': 'ट्यूटोरियल',
    'workspace.discovery.tutorials.desc': '3 मिनट में संपादन सीखें',
    'workspace.discovery.inspiration': 'प्रेरणा',
    'workspace.discovery.inspiration.desc': 'समुदाय रचनाएँ देखें',

    // Tools
    'tool.magic': 'जादुई',
    'tool.removeBg': 'स्मार्ट रिमूव',
    'tool.style': 'शैली',
    'tool.upscale': 'अपस्केल',
    'tool.analyze': 'विश्लेषण',

    // Tool Headers
    'header.magic': 'जादुई संपादन',
    'header.bg': 'स्मार्ट रिमूव',
    'header.style': 'सुधारें',
    'header.upscale': 'छवि अपस्केल',
    'header.analyze': 'विज़न विश्लेषण',

    // Properties
    'prop.prompt': 'प्रॉम्प्ट',
    'prop.placeholder': 'बदलावों का वर्णन करें...',
    'prop.presets': 'त्वरित प्रीसेट',
    'prop.analyzeDesc': 'जेमिनी दृश्य सामग्री का विश्लेषण करेगा और विस्तृत विवरण प्रदान करेगा।',
    'prop.generate': 'उत्पन्न करें',
    'prop.reset': 'रीसेट',
    'prop.analyzeBtn': 'संपत्ति का विश्लेषण करें',
    'prop.brushSize': 'ब्रश का आकार',
    'prop.clearMask': 'मास्क साफ़ करें',
    
    // Presets - Magic
    'preset.cyberpunk': 'साइबरपंक',
    'preset.3drender': '3D रेंडर',
    'preset.vector': 'वेक्टर',
    'preset.cinematic': 'सिनेमाई',
    'preset.bluesky': 'नीला आकाश',
    'preset.sunset': 'सूर्यास्त',
    'preset.winter': 'बर्फबारी',
    'preset.suit': 'सूट',
    'preset.smile': 'मुस्कान',
    'preset.glasses': 'चश्मा',
    'preset.anime': 'एनीमे शैली',
    'preset.sketch': 'पेंसिल स्केच',

    // Presets - Remove
    'preset.whiteBg': 'पृष्ठभूमि हटाएं',
    'preset.watermark': 'वॉटरमार्क हटाएं',
    'preset.text': 'टेक्स्ट हटाएं',
    'preset.people': 'लोग हटाएं',
    'preset.object': 'मैजिक इरेज़र',
    'preset.transparent': 'पारदर्शी पृष्ठभूमि',

    // Presets - Style
    'preset.studio': 'स्टूडियो',
    'preset.nature': 'प्रकृति',
    'preset.sharp': 'तीक्ष्ण',
    'preset.fixLight': 'प्रकाश ठीक करें',
    'preset.vibrant': 'जीवंत रंग',
    'preset.bw': 'ब्लैक एंड व्हाइट',
    'preset.vintage': 'विंटेज फिल्म',
    'preset.hdr': 'HDR पॉप',
    'preset.warm': 'गर्म टोन',
    'preset.cool': 'ठंडा टोन',

    // Presets - Upscale
    'preset.4k': '4K अल्ट्रा',
    'preset.portrait': 'पोर्ट्रेट',
    'preset.restore': 'बहाली',
    'preset.illus': 'चित्रण',
    
    // Analyze Presets
    'preset.analyze.general': 'विस्तृत विवरण',
    'preset.analyze.objects': 'वस्तुएं सूची',
    'preset.analyze.text': 'पाठ निकालें',
    'preset.analyze.marketing': 'मार्केटिंग टैग',

    // Preset Descriptions (HI)
    'preset.cyberpunk.desc': 'नीयन रोशनी और भविष्यवादी विज्ञान-कथा सौंदर्यशास्त्र के साथ दृश्यों को बदलता है।',
    'preset.3drender.desc': 'सपाट छवियों को गेम आइकन या मॉकअप के लिए उपयुक्त 3D संपत्तियों में परिवर्तित करता है।',
    'preset.vector.desc': 'छवि को साफ, सपाट वेक्टर कला लाइनों में सरल बनाता है।',
    'preset.cinematic.desc': 'नाटकीय प्रकाश व्यवस्था, और फिल्म-ग्रेड रंग ग्रेडिंग जोड़ता है।',
    'preset.whiteBg.desc': 'ई-कॉमर्स लिस्टिंग के लिए विषय को शुद्ध सफेद पृष्ठभूमि पर अलग करता है।',
    'preset.watermark.desc': 'बुद्धिमानी से वॉटरमार्क या लोगो का पता लगाता है और हटाता है।',
    'preset.text.desc': 'उपशीर्षक, कैप्शन या अन्य अवांछित टेक्स्ट ओवरले को साफ़ करता है।',
    'preset.people.desc': 'यात्रा की तस्वीरों से पर्यटकों या राहगीरों को हटाता है।',
    'preset.object.desc': 'संकेत में वर्णित अवांछित वस्तुओं को हटाने के लिए मैजिक इरेज़र के रूप में कार्य करता है।',
    'preset.transparent.desc': 'पारदर्शी पीएनजी छोड़ते हुए पृष्ठभूमि को पूरी तरह से हटा देता है।',
    'preset.studio.desc': 'उत्पाद को एक पेशेवर फोटोग्राफी स्टूडियो सेटिंग में रखता है।',
    'preset.nature.desc': 'विषय को प्राकृतिक, बाहरी वातावरण में ले जाता है।',
    'preset.sharp.desc': 'तीक्ष्णता और स्पष्टता बढ़ाने के लिए सामान्य वृद्धि।',
    'preset.fixLight.desc': 'संतुलित रूप के लिए जोखिम को संतुलित करता है और छाया को ठीक करता है।',
    'preset.vibrant.desc': 'एक ऊर्जावान रूप के लिए संतृप्ति और जीवंतता को बढ़ाता है।',
    'preset.bw.desc': 'उच्च-विपरीत, कलात्मक ब्लैक एंड व्हाइट में परिवर्तित करता है।',
    'preset.4k.desc': 'विवरण जोड़ते हुए रिज़ॉल्यूशन को 4K तक बढ़ाता है।',
    'preset.portrait.desc': 'चेहरों के लिए अनुकूलित, त्वचा को चिकना करता है और आंखों को तेज करता है।',
    'preset.restore.desc': 'पुरानी या कम गुणवत्ता वाली छवियों से शोर और कलाकृतियों को हटाता है।',
    'preset.illus.desc': 'उच्च गुणवत्ता वाले डिजिटल चित्रण की तरह दिखने के लिए लाइनों और रंगों को बढ़ाता है।',
    'preset.analyze.general.desc': 'पूरे छवि दृश्य का व्यापक कैप्शन प्रदान करता है।',
    'preset.analyze.objects.desc': 'फ़्रेम में दिखाई देने वाली सभी प्रमुख वस्तुओं की पहचान करता है और उन्हें सूचीबद्ध करता है।',
    'preset.analyze.text.desc': 'छवि से पाठ पढ़ने और निकालने की OCR क्षमता।',
    'preset.analyze.marketing.desc': 'सोशल मीडिया के लिए एसईओ कीवर्ड और हैशटैग उत्पन्न करता है।',

    // Guide Section
    'guide.title': 'स्टूडियो में महारत हासिल करें',
    'guide.subtitle': 'जानें कि हमारे एआई टूल्स का प्रभावी ढंग से उपयोग कैसे करें। अन्वेषण करने के लिए कार्ड क्लिक करें।',
    'guide.magic.title': 'जादुई संपादन',
    'guide.magic.desc': 'जनरेटिव एआई परिवर्तन।',
    'guide.bg.title': 'स्मार्ट रिमूव',
    'guide.bg.desc': 'वॉटरमार्क, टेक्स्ट और ऑब्जेक्ट साफ़ करें।',
    'guide.style.title': 'शैली स्थानांतरण',
    'guide.style.desc': 'कलात्मक मनोदशा परिवर्तन।',
    'guide.upscale.title': 'स्मार्ट अपस्केल',
    'guide.upscale.desc': 'रिज़ॉल्यूशन वृद्धि।',
    'guide.vision.title': 'विज़न विश्लेषण',
    'guide.vision.desc': 'अपनी छवियों को समझें।',
    'guide.arrow.next': 'अगला: प्रीसेट चुनें',

    // Guide Workflow
    'guide.workflow.title': 'उपयोग कैसे करें',
    'guide.workflow.step1': 'चरण 1: संपत्ति अपलोड करें',
    'guide.workflow.step1.desc': 'पूर्ण रचनात्मक कार्यक्षेत्र और उपकरणों को अनलॉक करने के लिए पहले अपनी तस्वीर अपलोड करें।',
    'guide.workflow.step1.hint': '(अनलॉक करने के लिए अपलोड करें)',
    'guide.workflow.step2': 'चरण 2: कार्यस्थान',
    'guide.workflow.step2.desc': 'स्टूडियो अपने आप खुल जाता है। त्वरित जादू लागू करने के लिए दाईं ओर से एक प्रीसेट का चयन करें।',
    'guide.presets.title': 'प्रीसेट कमांड सेंटर',

    // Footer
    'footer.rights': '© 2025 Kawada Ai & IT Solution. सर्वाधिकार सुरक्षित।',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा की शर्तें',
    'footer.contact': 'संपर्क करें',

    // Pages
    'page.privacy.title': 'गोपनीयता नीति',
    'page.terms.title': 'सेवा की शर्तें',
    'page.contact.title': 'संपर्क करें',
    'page.about.title': 'हमारे बारे में',
    'page.contact.subtitle': 'प्रश्न या प्रतिक्रिया है? हम आपसे सुनना पसंद करेंगे।',
    'contact.form.name': 'नाम',
    'contact.form.email': 'ईमेल',
    'contact.form.message': 'संदेश',
    'contact.form.send': 'संदेश भेजें',
    'contact.success': 'संदेश सफलतापूर्वक भेजा गया!',
    
    // About Page
    'about.desc': 'Kawada Ai Studio (KAS) का जन्म एक सरल लेकिन शक्तिशाली दृष्टि से हुआ था: AI को हर आम व्यक्ति के दैनिक जीवन को बेहतर बनाना चाहिए। कहानी हमारे संस्थापक के एक द्वीप पर प्रारंभिक जीवन के साथ शुरू हुई। जब वह अंततः अपने गृहनगर लौटा, तो उसने तेजी से आगे बढ़ती एआई तकनीक और आम जनता के बीच एक अदृश्य दीवार खड़ी पाई। उस दिन से, हमने इस दीवार को तोड़ने के लिए खुद को समर्पित कर दिया है। हमारा मिशन जटिल एआई को द्वीप की धूप की तरह सुलभ उपकरण में बदलना है—फेरीवालों, छात्रों और रचनाकारों को प्रौद्योगिकी के लाभों का समान रूप से आनंद लेने के लिए सशक्त बनाना।',
    'about.mission': 'हमारा मिशन',
    'about.mission.text': 'AI रचनात्मकता के लिए बाधाओं को कम करना और इन शक्तिशाली उपकरणों का उपयोग करने के तरीके पर मुफ्त, उच्च गुणवत्ता वाली शिक्षा प्रदान करना।',
    'about.community': 'समुदाय संचालित',
    'about.community.text': 'फेरीवालों, छात्रों और रचनाकारों के लिए बनाया गया।',
    'about.education': 'मुफ्त शिक्षा',
    'about.education.text': 'सभी के लिए एआई कौशल का लोकतंत्रीकरण।',
    'about.vision': 'हमारी दृष्टि',
    'about.vision.text': 'एक ऐसी दुनिया का निर्माण करना जहां रचनात्मकता की कोई सीमा न हो। हम एक ऐसे भविष्य की कल्पना करते हैं जहां उन्नत एआई तकनीक बिजली की तरह आम और उपयोग में आसान हो।',

    // Features Page (Hindi)
    'feat.hero.title': 'हर उपकरण को सरल बनाएं',
    'feat.hero.subtitle': '5 शक्तिशाली AI उपकरण जो काम और दैनिक जीवन के लिए सबसे आसान छवि समाधान प्रदान करते हैं।',
    'feat.card.magic.desc': 'एक ही चरण में छवियों को संशोधित, प्रतिस्थापित और विस्तारित करें।',
    'feat.card.remove.desc': 'अवांछित वस्तुओं या पाठ को तुरंत हटा दें।',
    'feat.card.style.desc': 'एक-क्लिक छवि शैली परिवर्तन।',
    'feat.card.upscale.desc': 'धुंधलापन ठीक करें और पुरानी तस्वीरों को फिर से बनाएं।',
    'feat.card.vision.desc': 'AI को आपकी छवियों का विश्लेषण और समझने दें।',
    'feat.card.cta': 'विवरण देखें',
    
    'feat.table.col.use': 'उपयोग का मामला',
    'feat.table.col.magic': 'जादुई संपादन',
    'feat.table.col.remove': 'स्मार्ट रिमूव',
    'feat.table.col.style': 'शैली स्थानांतरण',
    'feat.table.col.upscale': 'स्मार्ट अपस्केल',
    'feat.table.col.vision': 'विज़न विश्लेषण',
    
    'feat.table.row.core': 'मुख्य क्षमता',
    'feat.table.row.pain': 'समस्या हल',
    'feat.table.row.scene': 'परिदृश्य',
    
    'feat.table.magic.core': 'जनरेटिव संपादन',
    'feat.table.magic.pain': 'तत्वों को संशोधित करें',
    'feat.table.magic.scene': 'पृष्ठभूमि बदलें',
    
    'feat.table.remove.core': 'वस्तु मिटाना',
    'feat.table.remove.pain': 'अवांछित अव्यवस्था',
    'feat.table.remove.scene': 'अजनबियों को हटाएं',
    
    'feat.table.style.core': 'कलात्मक स्थानांतरण',
    'feat.table.style.pain': 'उबाऊ तस्वीरें',
    'feat.table.style.scene': 'फोटो से एनीमे',
    
    'feat.table.upscale.core': 'वृद्धि',
    'feat.table.upscale.pain': 'धुंधली छवियां',
    'feat.table.upscale.scene': 'प्रिंट / पुरानी तस्वीरें',
    
    'feat.table.vision.core': 'दृश्य पहचान',
    'feat.table.vision.pain': 'जानकारी निकालें',
    'feat.table.vision.scene': 'मार्केटिंग कॉपी',
    
    'feat.cta.title': 'अपनी छवि निर्माण शुरू करें',
    'feat.cta.btn': 'Kawada Ai Studio खोलें',
    'feat.cta.sub': 'उपयोग करने के लिए स्वतंत्र, कोई पंजीकरण आवश्यक नहीं।',

    // Showcase
    'showcase.hero.title': 'सामुदायिक शोकेस',
    'showcase.hero.subtitle': 'Kawada Ai Studio समुदाय से अद्भुत कृतियों का अन्वेषण करें। प्रेरित हों और अपना खुद का बनाएं।',
    'showcase.filter.all': 'सभी',
    'showcase.filter.portrait': 'पोर्ट्रेट',
    'showcase.filter.product': 'उत्पाद',
    'showcase.filter.landscape': 'परिदृश्य',
    'showcase.filter.creative': 'रचनात्मक',
    'showcase.card.after': 'बाद',
    'showcase.card.before': 'पहले',
    'showcase.card.try': 'इसे आज़माएं',

    // Contact Page Content
    'contact.getInTouch': 'संपर्क में रहें',
    'contact.desc': 'हम अपने एआई टूल्स, मूल्य निर्धारण या उद्यम समाधानों के बारे में किसी भी प्रश्न के साथ आपकी सहायता के लिए यहां हैं।',
    'contact.sent.title': 'संदेश भेजा गया!',
    'contact.sent.desc': 'हम शीघ्र ही आपसे संपर्क करेंगे।',

    // Privacy Policy Content
    'privacy.lastUpdated': 'अंतिम अपडेट: जनवरी 2025',
    'privacy.intro.title': '1. परिचय',
    'privacy.intro.text': 'Ken Ai Studio में आपका स्वागत है। हम आपकी गोपनीयता का सम्मान करते हैं और आपके व्यक्तिगत डेटा की सुरक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति आपको सूचित करेगी कि जब आप हमारी वेबसाइट पर जाते हैं तो हम आपके व्यक्तिगत डेटा की देखभाल कैसे करते हैं।',
    'privacy.data.title': '2. डेटा जो हम एकत्र करते हैं',
    'privacy.data.text': 'हम आपके बारे में विभिन्न प्रकार के व्यक्तिगत डेटा एकत्र, उपयोग, स्टोर और स्थानांतरित कर सकते हैं:',
    'privacy.data.list1': 'पहचान डेटा: इसमें पहला नाम, अंतिम नाम, उपयोगकर्ता नाम शामिल है।',
    'privacy.data.list2': 'संपर्क डेटा: इसमें ईमेल पता और टेलीफोन नंबर शामिल हैं।',
    'privacy.data.list3': 'तकनीकी डेटा: इसमें इंटरनेट प्रोटोकॉल (IP) पता, ब्राउज़र प्रकार शामिल है।',
    'privacy.use.title': '3. हम आपके डेटा का उपयोग कैसे करते हैं',
    'privacy.use.text': 'हम केवल तभी आपके व्यक्तिगत डेटा का उपयोग करेंगे जब कानून हमें अनुमति देता है, जैसे कि अनुबंध करने के लिए या वैध हितों के लिए।',
    'privacy.security.title': '4. डेटा सुरक्षा',
    'privacy.security.text': 'हमने आपके व्यक्तिगत डेटा को गलती से खो जाने, उपयोग किए जाने या अनधिकृत तरीके से एक्सेस किए जाने से रोकने के लिए उचित सुरक्षा उपाय किए हैं।',
    'privacy.contact.title': '5. संपर्क करें',
    'privacy.contact.text': 'यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें।',

    // Terms of Service Content
    'terms.lastUpdated': 'अंतिम अपडेट: जनवरी 2025',
    'terms.agreement.title': '1. शर्तों के लिए समझौता',
    'terms.agreement.text': 'Ken Ai Studio तक पहुंचकर या उसका उपयोग करके, आप इन सेवा की शर्तों से बंधे होने के लिए सहमत हैं।',
    'terms.ip.title': '2. बौद्धिक संपदा',
    'terms.ip.text': 'सेवा और इसकी मूल सामग्री Ken Ai Studio की अनन्य संपत्ति है। आप अपने द्वारा अपलोड की गई छवियों के सभी अधिकार बरकरार रखते हैं।',
    'terms.accounts.title': '3. उपयोगकर्ता खाते',
    'terms.accounts.text': 'खाता बनाते समय आपको सटीक जानकारी प्रदान करनी चाहिए। ऐसा करने में विफलता शर्तों का उल्लंघन है।',
    'terms.limits.title': '4. उपयोग सीमाएं',
    'terms.limits.text': 'आप हमारी सेवाओं का दुरुपयोग न करने के लिए सहमत हैं। हम अपने विवेक पर संसाधनों को सीमित करने का अधिकार सुरक्षित रखते हैं।',
    'terms.termination.title': '5. समाप्ति',
    'terms.termination.text': 'हम बिना किसी पूर्व सूचना के, किसी भी कारण से, अपनी सेवा तक पहुंच को तुरंत समाप्त या निलंबित कर सकते हैं।',
    'terms.changes.title': '6. परिवर्तन',
    'terms.changes.text': 'हम किसी भी समय इन शर्तों को संशोधित करने या बदलने का अधिकार सुरक्षित रखते हैं।',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
