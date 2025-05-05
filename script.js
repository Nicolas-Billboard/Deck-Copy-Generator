document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('deckCopyForm');
    const generatedContent = document.getElementById('generatedContent');
    const copyButton = document.createElement('button');
    
    // Setup copy button
    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy to Clipboard';
    copyButton.className = 'copy-button';
    copyButton.style.display = 'none'; // Hide initially
    
    // Insert copy button after generated content
    generatedContent.parentNode.insertBefore(copyButton, generatedContent.nextSibling);
    
    // Copy functionality
    copyButton.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText(generatedContent.textContent);
            
            // Visual feedback
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyButton.classList.add('copied');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                copyButton.innerHTML = originalText;
                copyButton.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            copyButton.innerHTML = '<i class="fas fa-times"></i> Failed to copy';
            copyButton.classList.add('error');
            
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy to Clipboard';
                copyButton.classList.remove('error');
            }, 2000);
        }
    });

    // Expanded tone-based sentence fragments
    const introFragments = {
        professional: [
            "Introducing our innovative",
            "Discover the advanced",
            "Experience the professional-grade",
            "Meet the industry-leading",
            "Presenting our premium",
            "Unveiling our state-of-the-art",
            "Welcome to the future of",
            "Revolutionizing industry standards with our",
            "Setting new benchmarks with our",
            "Elevating professional excellence with our",
            "Pioneering innovation with our",
            "Transforming workflows with our",
            "Optimizing performance with our",
            "Advancing capabilities with our",
            "Redefining excellence with our"
        ],
        casual: [
            "Check out our awesome",
            "Get ready for the amazing",
            "Say hello to the cool",
            "Take a look at our fantastic",
            "Meet your new favorite",
            "Get excited about our fresh",
            "You'll love our new",
            "Here's our super cool",
            "Discover our fun",
            "Jump into the world of our",
            "Experience our exciting",
            "Get your hands on our",
            "Level up with our",
            "Upgrade your day with our",
            "Make life better with our"
        ],
        friendly: [
            "We're excited to share our wonderful",
            "You'll love our delightful",
            "Let us introduce you to our lovely",
            "Get to know our amazing",
            "We're proud to present our fantastic",
            "Meet our heartwarming",
            "Discover the joy of our",
            "Share in the delight of our",
            "Welcome to the family of our",
            "Join us in celebrating our",
            "Experience the warmth of our",
            "Feel the comfort of our",
            "Embrace the charm of our",
            "Find happiness with our",
            "Create memories with our"
        ],
        formal: [
            "We present our distinguished",
            "We are pleased to introduce our exceptional",
            "We proudly unveil our prestigious",
            "Announcing our sophisticated",
            "We present our distinguished",
            "Presenting our esteemed",
            "We are honored to present our",
            "Introducing our refined",
            "Unveiling our distinguished",
            "We take pride in presenting our",
            "Announcing our masterfully crafted",
            "Presenting our meticulously designed",
            "Introducing our exemplary",
            "We are privileged to present our",
            "Showcasing our premium"
        ],
        enthusiastic: [
            "Get ready to be amazed by our incredible",
            "Prepare to be blown away by our spectacular",
            "You won't believe our amazing",
            "We're thrilled to showcase our outstanding",
            "Behold our extraordinary",
            "Get pumped for our incredible",
            "Prepare to be dazzled by our",
            "You'll be amazed by our",
            "Witness the magic of our",
            "Experience the thrill of our",
            "Be inspired by our",
            "Feel the excitement of our",
            "Marvel at our",
            "Get energized by our",
            "Be captivated by our"
        ],
        technical: [
            "Engineered for excellence, our",
            "Technically advanced, our",
            "Precision-engineered, our",
            "Scientifically designed, our",
            "Meticulously engineered, our",
            "Technically superior, our",
            "Systematically optimized, our",
            "Algorithmically enhanced, our",
            "Computationally advanced, our",
            "Mechanically refined, our",
            "Technically sophisticated, our",
            "Engineering breakthrough: our",
            "Technical innovation: our",
            "Precision-crafted, our",
            "Systematically developed, our"
        ],
        luxurious: [
            "Indulge in our exquisite",
            "Experience luxury with our",
            "Discover opulence in our",
            "Elevate your lifestyle with our",
            "Immerse yourself in our luxurious",
            "Embrace excellence with our",
            "Savor the refinement of our",
            "Delight in our premium",
            "Experience grandeur with our",
            "Unveiling our masterpiece:",
            "Presenting our crown jewel:",
            "Discover perfection in our",
            "Experience magnificence with our",
            "Behold our prestigious",
            "Welcome to luxury with our"
        ],
        minimalist: [
            "Simply put: our",
            "Clean and clear: our",
            "Essentially speaking: our",
            "Purely designed: our",
            "Minimally perfect: our",
            "Streamlined solution: our",
            "Elegantly simple: our",
            "Pure excellence: our",
            "Refined simplicity: our",
            "Clear choice: our",
            "Simply superior: our",
            "Pure innovation: our",
            "Essential elegance: our",
            "Simply sophisticated: our",
            "Purely professional: our"
        ]
    };

    const functionFragments = {
        professional: [
            "designed to deliver superior performance",
            "engineered for optimal efficiency",
            "crafted for professional excellence",
            "built to exceed expectations",
            "developed with cutting-edge technology",
            "optimized for maximum productivity",
            "created for professional environments",
            "designed for enterprise-level performance",
            "engineered to professional standards",
            "built for business excellence",
            "developed for optimal results",
            "crafted for professional success",
            "designed for peak performance",
            "engineered for reliability",
            "built for professional demands"
        ],
        casual: [
            "that makes life easier",
            "perfect for everyday use",
            "that you'll absolutely love",
            "made just for you",
            "that fits your lifestyle",
            "designed for daily fun",
            "that simplifies your routine",
            "perfect for any situation",
            "that adds convenience",
            "made for everyday adventures",
            "that brings ease to your day",
            "designed for simple living",
            "that makes things better",
            "perfect for regular use",
            "that enhances daily life"
        ],
        friendly: [
            "created with you in mind",
            "that brings joy to your day",
            "perfect for your needs",
            "designed to make you smile",
            "that you'll cherish",
            "made to brighten your day",
            "that brings comfort and joy",
            "designed for your happiness",
            "that makes life pleasant",
            "created for your comfort",
            "that adds warmth to your day",
            "perfect for your lifestyle",
            "designed with care",
            "that brings peace of mind",
            "made for your enjoyment"
        ],
        formal: [
            "exemplifying excellence in design",
            "representing the pinnacle of quality",
            "embodying superior craftsmanship",
            "setting new standards in the industry",
            "demonstrating unparalleled sophistication",
            "manifesting exceptional quality",
            "exhibiting superior refinement",
            "showcasing masterful design",
            "presenting unprecedented excellence",
            "displaying remarkable sophistication",
            "embodying superior standards",
            "representing exceptional craft",
            "demonstrating superior quality",
            "manifesting elegant design",
            "exhibiting refined taste"
        ],
        enthusiastic: [
            "that will revolutionize your experience",
            "that sets new standards of excellence",
            "that's changing the game",
            "that delivers amazing results",
            "that exceeds all expectations",
            "that transforms everything",
            "that breaks all records",
            "that pushes boundaries",
            "that defies expectations",
            "that creates magic",
            "that inspires wonder",
            "that amazes everyone",
            "that breaks new ground",
            "that sets new records",
            "that creates excitement"
        ],
        technical: [
            "utilizing advanced algorithms",
            "implementing cutting-edge technology",
            "featuring precise engineering",
            "incorporating advanced systems",
            "leveraging technical innovation",
            "employing advanced mechanics",
            "utilizing precise calculations",
            "implementing smart technology",
            "featuring advanced computing",
            "incorporating precise controls",
            "leveraging smart systems",
            "employing technical excellence",
            "utilizing advanced processing",
            "implementing precise methods",
            "featuring smart integration"
        ],
        luxurious: [
            "crafted for unparalleled luxury",
            "designed for exclusive experiences",
            "created for discriminating tastes",
            "engineered for premium lifestyle",
            "crafted for ultimate indulgence",
            "designed for luxurious living",
            "created for exceptional moments",
            "engineered for supreme comfort",
            "crafted for elite experiences",
            "designed for refined tastes",
            "created for premium quality",
            "engineered for excellence",
            "crafted for sophistication",
            "designed for luxury",
            "created for perfection"
        ],
        minimalist: [
            "focused on essential function",
            "designed with pure simplicity",
            "created for clear purpose",
            "engineered to essentials",
            "refined to pure function",
            "designed with clarity",
            "created for simplicity",
            "engineered for focus",
            "refined to basics",
            "designed for essence",
            "created with purpose",
            "engineered for purity",
            "refined for function",
            "designed for clarity",
            "created with focus"
        ]
    };

    const closingFragments = {
        professional: [
            "Perfect for modern business environments.",
            "Ideal for professional applications.",
            "Designed to meet industry standards.",
            "Suitable for enterprise deployment.",
            "Ready for professional integration.",
            "Engineered for business success.",
            "Optimized for workplace efficiency.",
            "Built for professional excellence.",
            "Crafted for business performance.",
            "Developed for enterprise use.",
            "Tailored for professional needs.",
            "Designed for workplace innovation.",
            "Created for business optimization.",
            "Engineered for professional results.",
            "Built for enterprise excellence."
        ],
        casual: [
            "Perfect for everyday moments.",
            "Great for regular use.",
            "Just what you need day-to-day.",
            "Ideal for casual settings.",
            "Ready for daily adventures.",
            "Makes every day better.",
            "Fits right into your routine.",
            "Perfect for laid-back living.",
            "Great for regular activities.",
            "Ideal for everyday life.",
            "Ready for daily fun.",
            "Makes life easier.",
            "Fits your lifestyle perfectly.",
            "Perfect for casual enjoyment.",
            "Great for everyday tasks."
        ],
        friendly: [
            "You'll love having this in your life.",
            "Perfect for creating happy moments.",
            "Brings joy to every day.",
            "Makes life more enjoyable.",
            "Creates wonderful experiences.",
            "Adds happiness to your routine.",
            "Brings smiles every time.",
            "Perfect for sharing good times.",
            "Makes every day special.",
            "Creates lasting memories.",
            "Brings comfort and joy.",
            "Makes life more pleasant.",
            "Creates happy experiences.",
            "Perfect for joyful moments.",
            "Adds warmth to your day."
        ],
        formal: [
            "Exemplifying the pinnacle of refinement.",
            "Meeting the highest standards of excellence.",
            "Representing superior quality and design.",
            "Establishing new benchmarks in sophistication.",
            "Demonstrating unparalleled elegance.",
            "Setting new standards of excellence.",
            "Embodying sophisticated design principles.",
            "Reflecting superior craftsmanship.",
            "Maintaining the highest quality standards.",
            "Exemplifying design excellence.",
            "Representing refined taste.",
            "Establishing elegant solutions.",
            "Demonstrating superior quality.",
            "Setting refined standards.",
            "Embodying excellence."
        ],
        enthusiastic: [
            "Get ready to be amazed!",
            "Experience the difference today!",
            "Transform your experience now!",
            "Discover the excitement!",
            "Feel the innovation!",
            "Join the revolution!",
            "Embrace the future!",
            "Change your perspective!",
            "Level up your experience!",
            "Feel the difference!",
            "Transform your world!",
            "Experience excellence!",
            "Discover innovation!",
            "Join the evolution!",
            "Embrace excellence!"
        ],
        technical: [
            "Optimized for peak performance.",
            "Engineered for technical excellence.",
            "Designed with precision metrics.",
            "Built on advanced architecture.",
            "Developed with technical precision.",
            "Optimized through rigorous testing.",
            "Engineered for optimal results.",
            "Designed with technical expertise.",
            "Built for maximum efficiency.",
            "Developed with precision.",
            "Optimized for excellence.",
            "Engineered with care.",
            "Designed for performance.",
            "Built with precision.",
            "Developed for success."
        ],
        luxurious: [
            "Experience luxury redefined.",
            "Elevate your lifestyle today.",
            "Discover true sophistication.",
            "Embrace superior quality.",
            "Indulge in excellence.",
            "Experience refined living.",
            "Elevate your standards.",
            "Discover true luxury.",
            "Embrace sophistication.",
            "Indulge in perfection.",
            "Experience elegance.",
            "Elevate your world.",
            "Discover excellence.",
            "Embrace luxury.",
            "Indulge in quality."
        ],
        minimalist: [
            "Simply perfect.",
            "Elegantly essential.",
            "Purely refined.",
            "Clearly superior.",
            "Perfectly simple.",
            "Essentially elegant.",
            "Purely perfect.",
            "Clearly refined.",
            "Simply superior.",
            "Elegantly pure.",
            "Perfectly refined.",
            "Essentially perfect.",
            "Purely elegant.",
            "Clearly essential.",
            "Simply pure."
        ]
    };

    const audienceFragments = {
        professional: [
            "for discerning professionals",
            "for industry leaders",
            "for business excellence",
            "for the modern workplace",
            "for professional environments",
            "for enterprise solutions",
            "for business professionals",
            "for corporate excellence",
            "for industry experts",
            "for professional teams",
            "for business efficiency",
            "for workplace optimization",
            "for professional success",
            "for business innovation",
            "for corporate advancement"
        ],
        casual: [
            "for everyone",
            "for daily life",
            "for any occasion",
            "for your lifestyle",
            "for everyday adventures",
            "for regular use",
            "for daily enjoyment",
            "for casual living",
            "for everyday fun",
            "for simple pleasure",
            "for daily convenience",
            "for lifestyle enhancement",
            "for easy living",
            "for everyday use",
            "for simple enjoyment"
        ],
        friendly: [
            "for you and your family",
            "for your home",
            "for your daily joy",
            "for your comfort",
            "for your peace of mind",
            "for family moments",
            "for home comfort",
            "for daily happiness",
            "for your wellbeing",
            "for family joy",
            "for home harmony",
            "for your satisfaction",
            "for family time",
            "for home life",
            "for your enjoyment"
        ],
        formal: [
            "for distinguished clientele",
            "for refined tastes",
            "for sophisticated users",
            "for premium experiences",
            "for selective consumers",
            "for discerning tastes",
            "for refined preferences",
            "for sophisticated needs",
            "for premium clients",
            "for selective tastes",
            "for distinguished needs",
            "for refined experiences",
            "for sophisticated clients",
            "for premium users",
            "for selective requirements"
        ],
        enthusiastic: [
            "for thrill-seekers",
            "for innovation lovers",
            "for trendsetters",
            "for adventure enthusiasts",
            "for those who demand the best",
            "for excitement seekers",
            "for passionate users",
            "for experience lovers",
            "for adventure seekers",
            "for enthusiast needs",
            "for thrill lovers",
            "for innovation seekers",
            "for trend lovers",
            "for adventurers",
            "for passionate enthusiasts"
        ],
        technical: [
            "for technical professionals",
            "for system experts",
            "for power users",
            "for technical environments",
            "for specialized applications",
            "for technical experts",
            "for system professionals",
            "for power applications",
            "for technical users",
            "for specialized needs",
            "for expert users",
            "for system requirements",
            "for power needs",
            "for technical demands",
            "for specialized users"
        ],
        luxurious: [
            "for luxury connoisseurs",
            "for premium lifestyles",
            "for exclusive tastes",
            "for discriminating clients",
            "for luxury enthusiasts",
            "for premium clients",
            "for exclusive needs",
            "for discriminating tastes",
            "for luxury lovers",
            "for premium users",
            "for exclusive clients",
            "for discriminating needs",
            "for luxury seekers",
            "for premium tastes",
            "for exclusive users"
        ],
        minimalist: [
            "for essential living",
            "for simplified needs",
            "for focused users",
            "for pure functionality",
            "for minimalist tastes",
            "for essential needs",
            "for simplified living",
            "for focused living",
            "for pure needs",
            "for minimalist living",
            "for essential users",
            "for simplified tastes",
            "for focused needs",
            "for pure living",
            "for minimalist users"
        ]
    };

    // Add brand-specific language patterns
    const brandContexts = {
        alcohol: {
            intros: [
                "Perfect for your next celebration",
                "Time to raise the bar with",
                "Elevate your drink game with",
                "Get the party started with",
                "Toast to good times with"
            ],
            descriptors: [
                "party-ready presentation",
                "celebration-worthy selection",
                "crowd-pleasing variety",
                "perfectly chilled refreshment",
                "refreshingly unique taste"
            ],
            contexts: [
                "perfect for tailgating",
                "ideal for social gatherings",
                "great for happy hour",
                "essential for your home bar",
                "made for good times"
            ]
        },
        uniforms: {
            intros: [
                "Elevate your professional presence with",
                "Make a lasting impression with",
                "Command attention with",
                "Present a unified image with",
                "Transform your team with"
            ],
            descriptors: [
                "professionally tailored fit",
                "crisp and polished appearance",
                "uniform-ready design",
                "consistently sharp look",
                "workplace-approved style"
            ],
            contexts: [
                "perfect for corporate environments",
                "ideal for airport transitions",
                "great for customer-facing roles",
                "designed for daily wear",
                "suitable for professional settings"
            ]
        },
        giveaways: {
            intros: [
                "Make a lasting impression with",
                "Delight your audience with",
                "Create buzz with",
                "Stand out with",
                "Capture attention with"
            ],
            descriptors: [
                "crowd-favorite design",
                "memorable impression",
                "attention-grabbing style",
                "brand-worthy presentation",
                "promotional-perfect finish"
            ],
            contexts: [
                "perfect for events",
                "ideal for trade shows",
                "great for brand awareness",
                "designed for maximum impact",
                "made for sharing"
            ]
        },
        electronics: {
            intros: [
                "Power up your potential with",
                "Upgrade your tech game with",
                "Experience innovation with",
                "Connect to the future with",
                "Transform your workflow with"
            ],
            descriptors: [
                "tech-savvy features",
                "digitally advanced interface",
                "smart-enabled functionality",
                "connectivity-ready system",
                "future-proof design"
            ],
            contexts: [
                "perfect for modern workspaces",
                "ideal for digital natives",
                "great for tech enthusiasts",
                "designed for seamless integration",
                "built for the digital age"
            ]
        },
        sports: {
            intros: [
                "Gear up for victory with",
                "Elevate your game with",
                "Dominate the field with",
                "Train harder with",
                "Push your limits with"
            ],
            descriptors: [
                "performance-ready design",
                "athletically engineered construction",
                "competition-grade quality",
                "sports-optimized features",
                "endurance-tested durability"
            ],
            contexts: [
                "perfect for athletes",
                "ideal for training",
                "great for competition",
                "designed for peak performance",
                "built for champions"
            ]
        },
        luxury: {
            intros: [
                "Indulge in excellence with",
                "Experience pure luxury with",
                "Elevate your lifestyle with",
                "Discover refinement with",
                "Embrace sophistication with"
            ],
            descriptors: [
                "premium-crafted finish",
                "luxuriously detailed design",
                "elegantly designed features",
                "exclusively created style",
                "meticulously finished craftsmanship"
            ],
            contexts: [
                "perfect for connoisseurs",
                "ideal for sophisticated tastes",
                "great for luxury lifestyles",
                "designed for discerning individuals",
                "crafted for excellence"
            ]
        },
        office: {
            intros: [
                "Optimize your workspace with",
                "Enhance productivity with",
                "Transform your office with",
                "Streamline operations with",
                "Upgrade your workplace with"
            ],
            descriptors: [
                "office-ready functionality",
                "productivity-enhancing features",
                "workspace-optimized design",
                "professionally designed layout",
                "business-friendly configuration"
            ],
            contexts: [
                "perfect for modern offices",
                "ideal for professional settings",
                "great for workplace efficiency",
                "designed for business use",
                "built for productivity"
            ]
        },
        lifestyle: {
            intros: [
                "Enhance your wellbeing with",
                "Live better with",
                "Transform your routine with",
                "Find balance with",
                "Embrace wellness with"
            ],
            descriptors: [
                "lifestyle-enhancing design",
                "wellness-focused features",
                "mindfully designed elements",
                "health-conscious construction",
                "balance-promoting functionality"
            ],
            contexts: [
                "perfect for daily wellness",
                "ideal for healthy living",
                "great for self-care",
                "designed for better living",
                "made for mindful moments"
            ]
        }
    };

    // Tone-based language patterns
    const tonePatterns = {
        casual: {
            intros: [
                "Check out",
                "Get ready for",
                "Introducing",
                "Meet",
                "Say hello to",
                "Take a look at",
                "Get excited about",
                "Discover",
                "Experience",
                "Level up with"
            ],
            descriptors: [
                "stylish design",
                "comfortable fit",
                "versatile functionality",
                "trendy appearance",
                "eye-catching look",
                "modern aesthetic",
                "fresh style",
                "playful character",
                "fun personality",
                "cool vibe"
            ],
            functions: [
                "designed for everyday style",
                "perfect for any occasion",
                "made for comfort and fun",
                "that brings style to your day",
                "crafted for casual occasions",
                "that adds personality to your look",
                "perfect for expressing yourself",
                "that combines comfort and style",
                "designed to make you smile",
                "that stands out from the crowd"
            ],
            closings: [
                "Time to show your style!",
                "Get ready to stand out!",
                "Express yourself!",
                "Make it yours!",
                "Show off your personality!",
                "Rock your look!",
                "Style it your way!",
                "Make a statement!",
                "Own your style!",
                "Let your personality shine!"
            ]
        },
        professional: {
            intros: [
                "Introducing",
                "Presenting",
                "Discover",
                "Experience",
                "Elevate your style with",
                "Meet",
                "Enhance your wardrobe with",
                "Transform your look with",
                "Upgrade your attire with",
                "Complete your ensemble with"
            ],
            descriptors: [
                "refined elegance",
                "tailored precision",
                "sophisticated design",
                "professional appearance",
                "polished finish",
                "elegant styling",
                "distinguished look",
                "pristine quality",
                "premium craftsmanship",
                "classic aesthetic"
            ],
            functions: [
                "crafted for professional excellence",
                "designed for sophisticated style",
                "tailored for a refined look",
                "made for distinguished occasions",
                "perfect for professional settings",
                "that embodies elegance",
                "created for lasting impressions",
                "designed to elevate your presence",
                "that exemplifies sophistication",
                "crafted for professional distinction"
            ],
            closings: [
                "Elevate your professional presence.",
                "Make a lasting impression.",
                "Command attention with confidence.",
                "Set the standard for excellence.",
                "Distinguished style awaits.",
                "Transform your professional image.",
                "Embrace refined elegance.",
                "Lead with sophistication.",
                "Define your signature style.",
                "Excellence in every detail."
            ]
        },
        adventurous: {
            intros: [
                "Gear up with",
                "Take on any challenge with",
                "Conquer the outdoors with",
                "Get ready for adventure with",
                "Explore new horizons with",
                "Tackle any terrain with",
                "Brave the elements with",
                "Push boundaries with",
                "Adventure awaits with",
                "Discover new paths with"
            ],
            descriptors: [
                "durable construction",
                "versatile design",
                "rugged build",
                "reliable performance",
                "performance-ready features",
                "weather-resistant protection",
                "adventure-ready capability",
                "trail-tested durability",
                "outdoor-optimized functionality",
                "all-terrain engineering"
            ],
            functions: [
                "built for outdoor performance",
                "designed for adventure",
                "engineered for the elements",
                "made for challenging conditions",
                "perfect for outdoor exploration",
                "that performs in any environment",
                "created for outdoor enthusiasts",
                "built to handle any challenge",
                "designed for peak performance",
                "that excels in the outdoors"
            ],
            closings: [
                "Adventure awaits!",
                "Get out there and explore!",
                "Conquer your next challenge!",
                "Push your boundaries!",
                "Take on the unknown!",
                "Embrace the adventure!",
                "Chart your course!",
                "Break new ground!",
                "Lead the way!",
                "The journey begins here!"
            ]
        }
    };

    // Helper functions for grammar and text processing
    function formatAttribute(attr) {
        attr = attr.toLowerCase().trim();
        attr = attr.replace(/\s+/g, ' ');
        attr = attr.replace(/^(a|an|the) /, '');
        return attr;
    }

    function addArticle(word) {
        if (word.endsWith('s') || /^(a|an|the) /.test(word)) {
            return word;
        }
        const vowelSounds = /^[aeiou]|^hour|^honest/i;
        return vowelSounds.test(word) ? 'an ' + word : 'a ' + word;
    }

    function formatFeatureList(features) {
        if (!features || features.length === 0) return '';
        
        const formattedFeatures = features.map(feature => {
            // Clean up the feature text
            let cleaned = feature.replace(/^(a|an|the) /, '').trim();
            
            // If it's just an adjective (ends in 'ed' or matches common adjective endings), add 'design' or 'finish'
            if (/ed$|ble$|ive$|ing$|ish$/.test(cleaned) && !cleaned.includes(' ')) {
                cleaned += ' finish';
            }
            
            return addArticle(cleaned);
        });
        
        if (formattedFeatures.length === 1) {
            return formattedFeatures[0];
        }
        
        if (formattedFeatures.length === 2) {
            return `${formattedFeatures[0]} and ${formattedFeatures[1]}`;
        }
        
        const lastFeature = formattedFeatures.pop();
        return `${formattedFeatures.join(', ')}, and ${lastFeature}`;
    }

    function getRandomFragment(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function generateDescription(itemName, tone, brand, features = []) {
        // Format item name
        itemName = formatAttribute(itemName);
        // Add article if needed and not already a "the" phrase
        if (!itemName.startsWith('the ')) {
            itemName = addArticle(itemName);
        }
        
        // Get patterns
        const patterns = tonePatterns[tone];
        const brandContext = brandContexts[brand];
        
        // Prepare features
        let allFeatures = [...features.map(f => formatAttribute(f))];
        
        // Add tone and brand descriptors with appropriate nouns
        if (patterns.descriptors && patterns.descriptors.length > 0) {
            const descriptor = getRandomFragment(patterns.descriptors);
            allFeatures.push(descriptor + (descriptor.includes(' ') ? '' : ' style'));
        }
        
        if (brandContext && brandContext.descriptors && brandContext.descriptors.length > 0) {
            const descriptor = getRandomFragment(brandContext.descriptors);
            allFeatures.push(descriptor + (descriptor.includes(' ') ? '' : ' design'));
        }
        
        // Remove duplicates and limit features
        allFeatures = [...new Set(allFeatures)].slice(0, 3);
        
        // Build description
        const intro = Math.random() < 0.3 && brandContext ? 
            getRandomFragment(brandContext.intros) : 
            getRandomFragment(patterns.intros);
        
        const functionDesc = getRandomFragment(patterns.functions);
        let descriptionText = `${intro} ${itemName} ${functionDesc}`;
        
        if (allFeatures.length > 0) {
            descriptionText += `, featuring ${formatFeatureList(allFeatures)}`;
        }
        
        if (brandContext && brandContext.contexts && Math.random() < 0.3) {
            descriptionText += `. ${getRandomFragment(brandContext.contexts)}`;
        }
        
        descriptionText += `. ${getRandomFragment(patterns.closings)}`;
        
        // Clean up formatting
        return descriptionText
            .replace(/\s+/g, ' ')
            .replace(/\. +/g, '. ')
            .replace(/\s+\./g, '.')
            .replace(/ ,/g, ',')
            .split('. ')
            .map(sentence => sentence.trim())
            .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
            .join('. ');
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const itemName = document.getElementById('itemName').value;
        const tone = document.getElementById('tone').value;
        const brand = document.getElementById('brand').value;
        const keyAttributes = document.getElementById('keyAttributes').value
            .split('\n')
            .filter(attr => attr.trim() !== '');
        
        // Even if keyAttributes is empty array, generate description
        const description = generateDescription(itemName, tone, brand, keyAttributes);
        generatedContent.textContent = description;
        
        // Show copy button when we have content
        copyButton.style.display = 'inline-flex';
    });

    // Set helpful placeholders
    document.getElementById('itemName').placeholder = "e.g., insulated water bottle, leather wallet";
    document.getElementById('keyAttributes').placeholder = "e.g., stainless steel construction\ndouble-wall insulated\nleakproof design\n\nAdd one feature per line";
}); 
