/**
 * ATA Chatbot Widget v3
 * Smart Home Automation Sales & Support Chatbot
 * Full business knowledge base + free-text NLP + quick replies
 * Self-contained, no external dependencies
 */

(function() {
  'use strict';

  const ATAChatbot = {
    state: {
      isOpen: false,
      currentScreen: 'greeting',
      userEmail: '',
      userName: '',
      userPhone: '',
      selectedService: '',
      messages: [],
      collectingField: null,
      collectingContext: null, // 'quote', 'maintenance-basic', 'maintenance-priority', 'maintenance-elite'
      sessionId: Math.random().toString(36).substr(2, 9)
    },

    config: {
      primaryColor: '#3A7FC1',
      darkBg: '#0D1117',
      lightText: '#FFFFFF',
      borderColor: '#1C2128',
      accentBlue: '#3A7FC1',
      serviceCallFee: 99,
      laborRateResidential: 90,
      laborRateCommercial: 110,
      squareBookingUrl: 'SQUARE_BOOKING_URL',
      apiEndpoint: '/api/leads',
      businessPhone: '(941) 263-5325',
      businessEmail: 'info@allthingsautomated.org',
      businessName: 'All Things Automated',
      businessWebsite: 'itsallthingsautomated.com',
      serviceArea: 'Sarasota, Manatee, and Charlotte Counties',
      businessHours: 'Monday through Friday, 8:00 AM to 5:00 PM',
      saturdayHours: 'Saturday by appointment only',
      tagline: 'Intelligent automation for modern living'
    },

    // ==================== KNOWLEDGE BASE ====================
    services: {
      'smart-lighting': {
        name: 'Smart Lighting Design',
        keywords: ['light', 'lighting', 'lutron', 'caseta', 'dimm', 'lamp', 'switch', 'scene', 'ra2', 'ra3', 'shade', 'blind', 'keypad'],
        description: 'We design and install Lutron smart lighting systems that give you complete control over every light in your home. Set custom scenes for movie night, dinner parties, or bedtime -- all from your phone, voice, or a sleek Lutron keypad.',
        brands: 'Lutron Caseta, Lutron RA2 Select, Lutron RadioRA 3',
        includes: 'Smart dimmers, switches, Pico remotes, keypads, smart bridge, scene programming, and voice assistant integration (Alexa, Google, Siri).',
        duration: 'About 2 hours per room. A typical 3-room setup takes a half day.',
        priceRange: 'Starts at $499 for a single room. Multi-room packages from $1,200+.',
        whyUs: 'We are a certified Lutron installer. Every system is custom-programmed to your lifestyle -- not a cookie-cutter setup.'
      },
      'security-cameras': {
        name: 'Security & Camera Systems',
        keywords: ['security', 'camera', 'cctv', 'surveillance', 'monitor', 'ring', 'luma', 'alarm', 'protect', 'doorbell', 'motion', 'sensor', 'lock', 'safe'],
        description: 'Professional-grade security camera installation with smart alerts, cloud recording, and remote viewing from your phone. We design systems that cover every angle of your property with zero blind spots.',
        brands: 'Ring, Luma Surveillance, Control4',
        includes: 'HD/4K cameras, video doorbell, professional mounting, cable runs, NVR/cloud setup, motion zones, smart alerts, and app walkthrough.',
        duration: '4 to 6 hours for a typical 4-6 camera residential install. Larger properties may require a full day.',
        priceRange: 'Ring doorbell + 2 cameras from $899. Full 6-8 camera Luma system from $2,500+.',
        whyUs: 'We handle the complete install including cable routing, weatherproofing, and optimal camera placement. No visible wires, no blind spots.'
      },
      'climate-control': {
        name: 'Smart Climate Control',
        keywords: ['climate', 'thermostat', 'hvac', 'heat', 'cool', 'air', 'temperature', 'nest', 'honeywell', 'ac', 'ecobee', 'energy', 'zone'],
        description: 'Intelligent HVAC automation with smart thermostats that learn your schedule, optimize energy usage, and keep every room at the perfect temperature. Control your climate from anywhere.',
        brands: 'Nest, Ecobee, Honeywell Home, Control4',
        includes: 'Smart thermostat installation, Wi-Fi setup, scheduling, geofencing configuration, multi-zone setup if applicable, and integration with your existing smart home system.',
        duration: 'About 1.5 hours for a single thermostat swap and setup. Multi-zone systems take 3-4 hours.',
        priceRange: 'Single thermostat install from $349. Multi-zone climate automation from $1,200+.',
        whyUs: 'We make sure your thermostat actually works with your HVAC system. We test every mode, configure your schedules, and integrate it with your lighting and security for truly automatic comfort.'
      },
      'full-automation': {
        name: 'Full Home Automation',
        keywords: ['full', 'whole', 'complete', 'control4', 'everything', 'entire', 'total', 'whole house', 'estate', 'custom', 'luxury'],
        description: 'The ultimate smart home experience. A single Control4 or Lutron RadioRA 3 system that unifies your lighting, security, climate, entertainment, shades, and more into one seamless interface. One app, one remote, total control.',
        brands: 'Control4, Lutron RadioRA 3, combined with Ring, Nest, Luma, Sonos, and more',
        includes: 'Whole-home lighting control, full security system, climate automation, entertainment integration, motorized shades, custom UI programming, touchscreens or remotes, dedicated project management, and extended support.',
        duration: '2 to 5 days depending on home size and complexity. We schedule around your availability.',
        priceRange: 'Starts at $8,500 for a standard home. Luxury estates typically range from $15,000 to $40,000+.',
        whyUs: 'This is where we really shine. We handle the full design, installation, and programming. You get a dedicated project manager and a system built to grow with you for years.'
      },
      'home-theater': {
        name: 'Home Theater & Audio',
        keywords: ['theater', 'theatre', 'audio', 'speaker', 'surround', 'sound', 'sonos', 'music', 'tv', 'mount', 'projector', 'media', 'entertainment'],
        description: 'From simple TV mounting with a soundbar to full surround-sound home theaters, we design entertainment systems that sound incredible and look clean. Hidden wires, perfect calibration.',
        brands: 'Sonos, Control4, various AV brands',
        includes: 'TV mounting, speaker installation, surround sound wiring, soundbar setup, streaming device configuration, and Control4 integration for one-touch movie mode.',
        duration: '2 to 4 hours for TV mount and soundbar. Full home theater takes 1-2 days.',
        priceRange: 'TV mounting with soundbar from $399. Full surround theater from $3,500+.',
        whyUs: 'Every wire hidden, every speaker calibrated. We test everything before we leave so your first movie night is perfect.'
      },
      'networking': {
        name: 'Smart Home Networking',
        keywords: ['wifi', 'network', 'internet', 'router', 'mesh', 'slow', 'dead spot', 'bandwidth', 'access point', 'ethernet', 'wired'],
        description: 'A smart home is only as good as its network. We design and install enterprise-grade Wi-Fi systems that eliminate dead spots and handle dozens of smart devices without breaking a sweat.',
        brands: 'Ubiquiti, Eero Pro, various enterprise-grade solutions',
        includes: 'Network assessment, access point placement, hardwired ethernet runs where needed, mesh Wi-Fi setup, device prioritization, and guest network configuration.',
        duration: '2 to 4 hours depending on home size and the number of access points.',
        priceRange: 'Basic mesh upgrade from $499. Full-home wired + wireless from $1,500+.',
        whyUs: 'Most smart home problems are actually network problems. We solve that first so everything else works flawlessly.'
      }
    },

    // Maintenance plan details
    maintenancePlans: {
      basic: {
        name: 'Basic Care',
        price: '$29/mo',
        annual: '$299/year',
        description: 'Keep your smart home up to date and running smoothly with an annual professional checkup and ongoing email support.',
        features: [
          'Annual on-site system health check',
          'Software and firmware updates for all devices',
          'Email support with 48-hour response time',
          '10% discount on service calls'
        ],
        bestFor: 'Homeowners with simple setups (1-2 rooms of smart devices) who want peace of mind.'
      },
      priority: {
        name: 'Priority Care',
        price: '$59/mo',
        annual: '$599/year',
        description: 'Our most popular plan. Twice-yearly checkups, fast phone support, remote troubleshooting, and a free annual service call.',
        features: [
          'Bi-annual on-site system health checks',
          'Software and firmware updates for all devices',
          'Priority phone and email support (4-hour response)',
          '1 free service call per year (a $99 value)',
          '15% discount on additional service calls',
          'Remote troubleshooting -- we can diagnose many issues without a visit'
        ],
        bestFor: 'Homeowners with multi-room setups or security systems who want fast, reliable support.'
      },
      elite: {
        name: 'Elite Care',
        price: '$99/mo',
        annual: '$999/year',
        description: 'White-glove service for whole-home automation clients. Quarterly inspections, same-day support, and priority scheduling for new projects.',
        features: [
          'Quarterly on-site inspections',
          'All software and firmware updates',
          'Same-day priority support during business hours',
          '2 free service calls per year (a $198 value)',
          '20% discount on all additional work and new installs',
          'Remote troubleshooting and proactive system monitoring',
          'Priority scheduling when adding new devices or systems'
        ],
        bestFor: 'Clients with Control4 or Lutron RA3 whole-home systems who expect premium, responsive service.'
      }
    },

    // Pricing packages
    packages: {
      smartStart: { name: 'Smart Start', price: '$499+', description: 'Single-room or single-device upgrade. Great entry point into smart home tech.' },
      homeEssentials: { name: 'Home Essentials', price: '$2,499+', description: 'Multi-room package with lighting, security cameras, thermostat, and smart lock. Our most popular choice.' },
      totalHome: { name: 'Total Home', price: '$8,500+', description: 'Complete whole-home automation with Control4 or Lutron RA3. The full experience.' }
    },

    // Brand knowledge
    brands: {
      lutron: { name: 'Lutron', specialty: 'lighting control', detail: 'We install the full Lutron lineup -- Caseta for smaller projects, RA2 Select for mid-range, and RadioRA 3 for whole-home luxury. Lutron is the gold standard in lighting automation with a 100-year company history.' },
      control4: { name: 'Control4', specialty: 'whole-home automation', detail: 'Control4 is the brain of a whole-home system. It ties together lighting, security, climate, entertainment, and shades into one interface. We are experienced Control4 programmers and can build systems from scratch or take over existing installs.' },
      ring: { name: 'Ring', specialty: 'security and doorbells', detail: 'Ring offers affordable, reliable security cameras and video doorbells. Great for clients who want solid security without a massive investment. Works with Alexa and most smart home systems.' },
      nest: { name: 'Nest / Google Home', specialty: 'thermostats and smart home hub', detail: 'Nest thermostats are some of the best on the market for energy savings and ease of use. We also integrate Google Home for voice control across your entire setup.' },
      honeywell: { name: 'Honeywell Home', specialty: 'climate control', detail: 'Honeywell makes rock-solid smart thermostats, especially for homes with complex HVAC systems. Their T-series works great with multi-zone setups.' },
      luma: { name: 'Luma Surveillance', specialty: 'professional security cameras', detail: 'Luma is our go-to for clients who want commercial-grade surveillance at home. 4K cameras, advanced analytics, and a fantastic mobile app. Perfect for larger properties.' }
    },

    // Intent keywords for NLP
    intents: {
      quote: ['quote', 'price', 'cost', 'how much', 'pricing', 'estimate', 'rate', 'afford', 'budget', 'expensive', 'cheap', 'free quote', 'consultation', 'investment', 'spend', 'pay'],
      booking: ['book', 'schedule', 'appointment', 'visit', 'come out', 'come by', 'service call', 'available', 'when can', 'set up a time', 'meet'],
      services: ['services', 'what do you', 'what can you', 'offer', 'options', 'help with', 'do you do', 'provide', 'work on', 'specialize', 'capabilities'],
      contact: ['contact', 'reach', 'call', 'phone', 'email', 'get in touch', 'message', 'talk to someone', 'speak with'],
      hours: ['hours', 'open', 'close', 'business hours', 'when are you', 'availability', 'weekend', 'saturday', 'sunday'],
      location: ['location', 'where', 'area', 'sarasota', 'manatee', 'charlotte', 'address', 'service area', 'near me', 'local', 'bradenton', 'venice', 'lakewood ranch', 'siesta key', 'longboat', 'bird key', 'punta gorda', 'port charlotte', 'north port', 'osprey', 'nokomis', 'englewood', 'palmetto', 'anna maria', 'casey key'],
      greeting: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo', 'howdy', 'whats up'],
      thanks: ['thank', 'thanks', 'appreciate', 'awesome', 'great', 'perfect', 'cool', 'sounds good'],
      troubleshoot: ['problem', 'issue', 'broken', 'not working', 'fix', 'repair', 'trouble', 'help', 'support', 'stopped', 'wont work', 'malfunction', 'glitch', 'reset', 'disconnected', 'offline'],
      maintenance: ['maintenance', 'plan', 'subscription', 'monthly', 'annual', 'checkup', 'health check', 'ongoing', 'support plan', 'care plan', 'basic care', 'priority care', 'elite care'],
      financing: ['financing', 'finance', 'payment plan', 'monthly payment', 'apr', 'loan', 'afford', 'installment', 'credit'],
      brands: ['brand', 'lutron', 'control4', 'ring', 'nest', 'google home', 'honeywell', 'luma', 'sonos', 'alexa', 'siri', 'homekit'],
      packages: ['package', 'bundle', 'smart start', 'home essentials', 'total home', 'starter', 'tier', 'level'],
      warranty: ['warranty', 'guarantee', 'covered', 'break', 'defect', 'replace', 'return'],
      diy: ['diy', 'do it myself', 'self install', 'install myself', 'youtube', 'tutorial'],
      existing: ['already have', 'existing', 'upgrade', 'add to', 'expand', 'integrate', 'current system', 'old system', 'take over'],
      timeline: ['how long', 'how fast', 'timeline', 'time frame', 'when', 'turnaround', 'lead time', 'wait'],
      referral: ['referral', 'refer', 'friend', 'recommend', 'tell someone']
    },

    init() {
      this.render();
      this.attachEventListeners();
    },

    render() {
      const container = document.createElement('div');
      container.id = 'ata-chatbot-widget';
      container.innerHTML = this.getWidgetHTML();
      document.body.appendChild(container);
      this.injectStyles();
    },

    getWidgetHTML() {
      return '<div class="ata-chat-widget">' +
        '<button class="ata-chat-toggle" id="ata-chat-toggle" aria-label="Open chat" title="Chat with us">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>' +
        '</button>' +
        '<div class="ata-chat-window" id="ata-chat-window" style="display: none;">' +
          '<div class="ata-chat-header">' +
            '<div class="ata-chat-header-left">' +
              '<div class="ata-chat-status-dot"></div>' +
              '<div>' +
                '<div class="ata-chat-title">All Things Automated</div>' +
                '<div class="ata-chat-subtitle">Smart Home Experts</div>' +
              '</div>' +
            '</div>' +
            '<button class="ata-chat-close" id="ata-chat-close" aria-label="Close chat">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
            '</button>' +
          '</div>' +
          '<div class="ata-chat-messages" id="ata-chat-messages"></div>' +
          '<div class="ata-chat-suggestions" id="ata-chat-suggestions"></div>' +
          '<div class="ata-chat-input-bar" id="ata-chat-input-bar">' +
            '<input type="text" id="ata-chat-input" class="ata-chat-text-input" placeholder="Type a message..." maxlength="500" autocomplete="off">' +
            '<button class="ata-chat-send-btn" id="ata-chat-send-btn" aria-label="Send message">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>' +
            '</button>' +
          '</div>' +
          '<div class="ata-chat-footer">Powered by All Things Automated</div>' +
        '</div>' +
      '</div>';
    },

    attachEventListeners() {
      var self = this;
      document.getElementById('ata-chat-toggle').addEventListener('click', function() { self.toggleChat(); });
      document.getElementById('ata-chat-close').addEventListener('click', function() { self.closeChat(); });
      document.getElementById('ata-chat-send-btn').addEventListener('click', function() { self.handleUserInput(); });
      document.getElementById('ata-chat-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') self.handleUserInput();
      });
    },

    toggleChat() {
      if (this.state.isOpen) this.closeChat();
      else this.openChat();
    },

    openChat() {
      this.state.isOpen = true;
      document.getElementById('ata-chat-window').style.display = 'flex';
      document.getElementById('ata-chat-toggle').classList.add('active');
      if (this.state.messages.length === 0) this.showGreeting();
      var self = this;
      setTimeout(function() {
        self.scrollToBottom();
        document.getElementById('ata-chat-input').focus();
      }, 100);
    },

    closeChat() {
      this.state.isOpen = false;
      document.getElementById('ata-chat-window').style.display = 'none';
      document.getElementById('ata-chat-toggle').classList.remove('active');
    },

    open: function() {
      if (!this.state.isOpen) this.openChat();
    },

    showGreeting() {
      this.addMessage('bot', 'Welcome to All Things Automated -- Sarasota\'s smart home experts. We design and install Lutron lighting, Control4 automation, security cameras, climate control, and more across Sarasota, Manatee, and Charlotte Counties.');
      var self = this;
      setTimeout(function() {
        self.addMessage('bot', 'How can we help you today? Ask me anything or pick an option below.');
        self.showSuggestions([
          { text: 'Get a Free Quote', action: 'quote' },
          { text: 'Book a Service Call', action: 'booking' },
          { text: 'Our Services', action: 'services' },
          { text: 'Pricing & Packages', action: 'packages' },
          { text: 'Maintenance Plans', action: 'maintenance' },
          { text: 'Contact Us', action: 'contact' }
        ]);
      }, 400);
      this.state.currentScreen = 'greeting';
    },

    addMessage(sender, text) {
      var message = { sender: sender, text: text, timestamp: new Date() };
      this.state.messages.push(message);
      this.renderMessage(message);
      this.scrollToBottom();
    },

    renderMessage(message) {
      var messagesContainer = document.getElementById('ata-chat-messages');
      var messageEl = document.createElement('div');
      messageEl.className = 'ata-message ata-message-' + message.sender;
      if (message.sender === 'bot' && message.text.includes('<a ')) {
        messageEl.innerHTML = message.text;
      } else {
        messageEl.textContent = message.text;
      }
      messagesContainer.appendChild(messageEl);
    },

    showSuggestions(suggestions) {
      var suggestionsArea = document.getElementById('ata-chat-suggestions');
      suggestionsArea.innerHTML = '';
      var container = document.createElement('div');
      container.className = 'ata-suggestions-row';
      var self = this;
      suggestions.forEach(function(s) {
        var btn = document.createElement('button');
        btn.className = 'ata-suggestion-btn';
        btn.textContent = s.text;
        btn.addEventListener('click', function() {
          self.addMessage('user', s.text);
          self.clearSuggestions();
          self.handleAction(s.action);
        });
        container.appendChild(btn);
      });
      suggestionsArea.appendChild(container);
    },

    clearSuggestions() {
      var el = document.getElementById('ata-chat-suggestions');
      if (el) el.innerHTML = '';
    },

    // ==================== MAIN INPUT HANDLER ====================
    handleUserInput() {
      var input = document.getElementById('ata-chat-input');
      var text = input.value.trim();
      if (!text) return;
      input.value = '';
      this.addMessage('user', text);
      this.clearSuggestions();
      if (this.state.collectingField) {
        this.handleFieldCollection(text);
        return;
      }
      this.processNaturalLanguage(text);
    },

    // ==================== NLP ENGINE ====================
    processNaturalLanguage(text) {
      var lower = text.toLowerCase().replace(/[^a-z0-9\s]/g, '');
      var matchedService = this.detectService(lower);
      var intent = this.detectIntent(lower);

      if (intent === 'greeting') this.respondGreeting();
      else if (intent === 'thanks') this.respondThanks();
      else if (intent === 'maintenance') this.respondMaintenance();
      else if (intent === 'financing') this.respondFinancing();
      else if (intent === 'packages') this.respondPackages();
      else if (intent === 'brands') this.respondBrands(lower);
      else if (intent === 'warranty') this.respondWarranty();
      else if (intent === 'diy') this.respondDIY();
      else if (intent === 'existing') this.respondExisting();
      else if (intent === 'timeline') this.respondTimeline();
      else if (intent === 'referral') this.respondReferral();
      else if (intent === 'quote') {
        if (matchedService) {
          this.state.selectedService = matchedService;
          this.addMessage('bot', 'Great choice! Let me get you a quote for ' + this.services[matchedService].name + '.');
          this.addMessage('bot', this.services[matchedService].description);
          this.addMessage('bot', 'Typical pricing: ' + this.services[matchedService].priceRange + '. Every home is different, so we provide a custom quote after understanding your needs. What is your name?');
          this.state.collectingField = 'name';
          this.state.collectingContext = 'quote';
          this.updatePlaceholder('Your name');
        } else {
          this.startQuoteFlow();
        }
      } else if (intent === 'booking') this.startBookingFlow();
      else if (intent === 'services') {
        if (matchedService) this.showSingleService(matchedService);
        else this.showServicesInfo();
      }
      else if (intent === 'contact') this.showContactInfo();
      else if (intent === 'hours') this.respondHours();
      else if (intent === 'location') this.respondLocation();
      else if (intent === 'troubleshoot') this.respondTroubleshoot();
      else if (matchedService) this.showSingleService(matchedService);
      else this.respondFallback(text);
    },

    detectIntent(text) {
      var bestIntent = null;
      var bestScore = 0;
      for (var intent in this.intents) {
        var score = 0;
        var keywords = this.intents[intent];
        for (var i = 0; i < keywords.length; i++) {
          if (text.includes(keywords[i])) {
            score += keywords[i].split(' ').length;
          }
        }
        if (score > bestScore) {
          bestScore = score;
          bestIntent = intent;
        }
      }
      return bestScore > 0 ? bestIntent : null;
    },

    detectService(text) {
      var bestService = null;
      var bestScore = 0;
      for (var key in this.services) {
        var score = 0;
        var keywords = this.services[key].keywords;
        for (var i = 0; i < keywords.length; i++) {
          if (text.includes(keywords[i])) score++;
        }
        if (score > bestScore) {
          bestScore = score;
          bestService = key;
        }
      }
      return bestScore > 0 ? bestService : null;
    },

    // ==================== RESPONSE HANDLERS ====================

    respondGreeting() {
      var greetings = [
        'Hey there! Thanks for reaching out to All Things Automated. We handle everything from Lutron lighting and security cameras to full Control4 home automation across the Sarasota area. What can we help you with?',
        'Hello! Welcome to All Things Automated -- Sarasota\'s smart home experts. Whether you need lighting, security, climate control, or a full smart home build, we have you covered. What are you looking for?',
        'Hi! Good to hear from you. We serve Sarasota, Manatee, and Charlotte Counties with professional smart home installation. How can we help today?'
      ];
      this.addMessage('bot', greetings[Math.floor(Math.random() * greetings.length)]);
      this.showSuggestions([
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Our Services', action: 'services' },
        { text: 'Pricing & Packages', action: 'packages' }
      ]);
    },

    respondThanks() {
      this.addMessage('bot', 'You are welcome! Is there anything else we can help with? We are always happy to answer questions about smart home automation.');
      this.showSuggestions([
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Our Services', action: 'services' },
        { text: 'That\'s all, thanks', action: 'goodbye' }
      ]);
    },

    respondHours() {
      this.addMessage('bot', 'All Things Automated is available ' + this.config.businessHours + '. ' + this.config.saturdayHours + '. We serve ' + this.config.serviceArea + '.');
      this.addMessage('bot', 'For urgent system issues outside business hours, our maintenance plan members with Priority Care or Elite Care get faster response times.');
      this.showSuggestions([
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'Maintenance Plans', action: 'maintenance' },
        { text: 'Contact Us', action: 'contact' }
      ]);
    },

    respondLocation() {
      this.addMessage('bot', 'We are based in Sarasota, Florida and serve the entire Gulf Coast tri-county area: Sarasota County, Manatee County, and Charlotte County.');
      this.addMessage('bot', 'That includes Sarasota, Bradenton, Lakewood Ranch, Siesta Key, Longboat Key, Bird Key, Venice, Osprey, Nokomis, Palmer Ranch, University Park, Anna Maria Island, Punta Gorda, Port Charlotte, North Port, Englewood, and everywhere in between.');
      this.addMessage('bot', 'All service calls are performed on-site at your location. No need to bring anything to us.');
      this.showSuggestions([
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'Get a Free Quote', action: 'quote' }
      ]);
    },

    respondTroubleshoot() {
      this.addMessage('bot', 'Sorry to hear something is not working right. Here are a few quick things to try: power-cycle the affected device (unplug for 30 seconds, plug back in), check your Wi-Fi connection, and make sure the device shows online in its app.');
      this.addMessage('bot', 'If that does not fix it, we can schedule a service call. A diagnostic visit is $' + this.config.serviceCallFee + ' and includes a full system assessment plus a binding quote on any repairs or adjustments needed. If you are on one of our maintenance plans, you may have free service calls included.');
      this.showSuggestions([
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'Maintenance Plans', action: 'maintenance' },
        { text: 'Contact Us', action: 'contact' }
      ]);
    },

    respondMaintenance() {
      this.addMessage('bot', 'We offer three maintenance plans to keep your smart home running perfectly:');
      var self = this;
      setTimeout(function() {
        self.addMessage('bot', 'Basic Care -- ' + self.maintenancePlans.basic.price + ' (' + self.maintenancePlans.basic.annual + ' annually). ' + self.maintenancePlans.basic.description);
      }, 300);
      setTimeout(function() {
        self.addMessage('bot', 'Priority Care -- ' + self.maintenancePlans.priority.price + ' (' + self.maintenancePlans.priority.annual + ' annually). ' + self.maintenancePlans.priority.description + ' This is our most popular plan.');
      }, 600);
      setTimeout(function() {
        self.addMessage('bot', 'Elite Care -- ' + self.maintenancePlans.elite.price + ' (' + self.maintenancePlans.elite.annual + ' annually). ' + self.maintenancePlans.elite.description);
      }, 900);
      setTimeout(function() {
        self.addMessage('bot', 'Want to learn more about a specific plan or sign up?');
        self.showSuggestions([
          { text: 'Basic Care Details', action: 'maintenance-basic' },
          { text: 'Priority Care Details', action: 'maintenance-priority' },
          { text: 'Elite Care Details', action: 'maintenance-elite' },
          { text: 'Sign Up for a Plan', action: 'maintenance-signup' },
          { text: 'Back to Menu', action: 'restart' }
        ]);
      }, 1200);
    },

    respondMaintenanceDetail(tier) {
      var plan = this.maintenancePlans[tier];
      this.addMessage('bot', plan.name + ' -- ' + plan.price + ' (or ' + plan.annual + ' billed annually)');
      this.addMessage('bot', plan.description);
      var features = 'What is included: ' + plan.features.join('. ') + '.';
      this.addMessage('bot', features);
      this.addMessage('bot', 'Best for: ' + plan.bestFor);
      var self = this;
      setTimeout(function() {
        self.addMessage('bot', 'Want to sign up for ' + plan.name + ' or learn about another plan?');
        self.showSuggestions([
          { text: 'Sign Up for ' + plan.name, action: 'maintenance-signup-' + tier },
          { text: 'Compare Plans', action: 'maintenance' },
          { text: 'View Plans Page', action: 'maintenance-page-' + tier },
          { text: 'Get a Free Quote', action: 'quote' }
        ]);
      }, 300);
    },

    respondFinancing() {
      this.addMessage('bot', 'We understand that a full smart home installation is an investment. That is why we offer flexible financing options through trusted lending partners.');
      this.addMessage('bot', 'Highlights: 0% APR available on qualifying purchases, terms from 6 to 60 months, quick 2-minute application with no impact to your credit score, and monthly payments that fit your budget.');
      this.addMessage('bot', 'Financing is available on installations of all sizes. Ask about it during your free consultation and we will walk you through the options.');
      this.showSuggestions([
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'View Pricing', action: 'packages' },
        { text: 'Contact Us', action: 'contact' }
      ]);
    },

    respondPackages() {
      this.addMessage('bot', 'We offer three main installation packages, plus fully custom solutions:');
      var self = this;
      setTimeout(function() {
        self.addMessage('bot', 'Smart Start (' + self.packages.smartStart.price + ') -- ' + self.packages.smartStart.description + ' Includes Lutron Caseta lighting for one room OR a smart thermostat, plus voice assistant setup and 30-day support.');
      }, 300);
      setTimeout(function() {
        self.addMessage('bot', 'Home Essentials (' + self.packages.homeEssentials.price + ') -- ' + self.packages.homeEssentials.description + ' Includes multi-room Caseta lighting, smart thermostat, Ring doorbell + 2 cameras, smart lock, custom scenes, and 90-day priority support.');
      }, 600);
      setTimeout(function() {
        self.addMessage('bot', 'Total Home (' + self.packages.totalHome.price + ') -- ' + self.packages.totalHome.description + ' Includes Control4 or Lutron RA3, full lighting, security, climate, entertainment integration, and 1-year support with a dedicated project manager.');
      }, 900);
      setTimeout(function() {
        self.addMessage('bot', 'Every project gets a free consultation where we assess your home and recommend the best fit. All pricing is transparent with no hidden fees.');
        self.showSuggestions([
          { text: 'Get a Free Quote', action: 'quote' },
          { text: 'Financing Options', action: 'financing' },
          { text: 'Maintenance Plans', action: 'maintenance' },
          { text: 'Book a Consultation', action: 'booking' }
        ]);
      }, 1200);
    },

    respondBrands(text) {
      // Check if they asked about a specific brand
      var found = null;
      for (var key in this.brands) {
        if (text.includes(key) || text.includes(this.brands[key].name.toLowerCase())) {
          found = this.brands[key];
          break;
        }
      }
      if (found) {
        this.addMessage('bot', found.name + ' (' + found.specialty + '): ' + found.detail);
      } else {
        this.addMessage('bot', 'We partner with the best brands in the industry:');
        this.addMessage('bot', 'Lutron (Caseta, RA2, RA3) for lighting. Control4 for whole-home automation. Ring and Luma for security cameras. Nest, Ecobee, and Honeywell for climate control. We also work with Sonos for audio and integrate with Alexa, Google Home, and Apple HomeKit.');
      }
      this.addMessage('bot', 'We select the right technology for your specific needs and budget. Every brand we use is something we trust and stand behind.');
      this.showSuggestions([
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Our Services', action: 'services' },
        { text: 'View Packages', action: 'packages' }
      ]);
    },

    respondWarranty() {
      this.addMessage('bot', 'All of our installations include a workmanship warranty. If something we installed is not working right, we will come back and make it right.');
      this.addMessage('bot', 'The devices themselves carry their manufacturer warranty (typically 1-3 years depending on the brand). We help you navigate warranty claims if anything ever goes wrong with the hardware.');
      this.addMessage('bot', 'For ongoing peace of mind beyond the warranty period, our maintenance plans include regular system checkups and priority support to catch issues early.');
      this.showSuggestions([
        { text: 'Maintenance Plans', action: 'maintenance' },
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'Contact Us', action: 'contact' }
      ]);
    },

    respondDIY() {
      this.addMessage('bot', 'We get it -- some smart home devices are designed for DIY. Simple things like a Nest thermostat or a Ring doorbell can often be self-installed.');
      this.addMessage('bot', 'Where professional installation really makes a difference is with lighting systems (Lutron requires neutral wire knowledge and custom programming), multi-camera security setups (proper placement, cable runs, NVR configuration), and especially whole-home systems like Control4 that need professional programming.');
      this.addMessage('bot', 'We also handle things most homeowners cannot do themselves: running wires through walls and attics, ensuring code compliance, programming custom scenes and automations, and making sure all your devices talk to each other reliably.');
      this.addMessage('bot', 'The good news: we offer a free consultation to assess what you need. No pressure, just honest advice on what is worth DIY and what benefits from professional installation.');
      this.showSuggestions([
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Our Services', action: 'services' },
        { text: 'Book a Consultation', action: 'booking' }
      ]);
    },

    respondExisting() {
      this.addMessage('bot', 'Absolutely, we work with existing systems all the time. Whether you have a Lutron setup that needs expanding, a Control4 system that needs reprogramming, or a mix of devices from a previous installer, we can take it over and make it work better.');
      this.addMessage('bot', 'We can also integrate new devices into your current setup. For example, adding security cameras to an existing Lutron lighting system, or bringing an older Control4 install up to date with the latest software.');
      this.addMessage('bot', 'The best first step is a service call where we assess your current system and recommend the most cost-effective path forward.');
      this.showSuggestions([
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Our Services', action: 'services' }
      ]);
    },

    respondTimeline() {
      this.addMessage('bot', 'Timelines depend on the scope of the project:');
      this.addMessage('bot', 'Single-room lighting: about 2 hours. Thermostat install: about 1.5 hours. Security cameras (4-6): half a day. Multi-room lighting or Home Essentials package: 1 day. Full home automation (Control4/RA3): 2-5 days depending on home size.');
      this.addMessage('bot', 'From your first consultation to installation day, most projects are completed within 1-2 weeks. Larger custom projects may take 3-4 weeks to design and install. We always work around your schedule.');
      this.showSuggestions([
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Book a Consultation', action: 'booking' },
        { text: 'View Packages', action: 'packages' }
      ]);
    },

    respondReferral() {
      this.addMessage('bot', 'We love referrals! If you know someone who could benefit from smart home automation, send them our way. Happy clients are the best way we grow our business.');
      this.addMessage('bot', 'You can share our website at <a href="https://itsallthingsautomated.com" target="_blank" style="color:#3A7FC1">itsallthingsautomated.com</a> or have them call us at <a href="tel:+19412635325" style="color:#3A7FC1">' + this.config.businessPhone + '</a>.');
      this.showSuggestions([
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Our Services', action: 'services' },
        { text: 'Contact Us', action: 'contact' }
      ]);
    },

    respondFallback(originalText) {
      this.addMessage('bot', 'Thanks for reaching out! I can help with a lot of smart home questions. Here are some things I can assist with: getting a free quote, booking a service call, learning about our services and pricing, understanding our maintenance plans, exploring financing options, or getting in touch with our team.');
      this.addMessage('bot', 'You can also ask about specific brands like Lutron, Control4, or Ring, or ask how long installations take. What would you like to know?');
      this.showSuggestions([
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Our Services', action: 'services' },
        { text: 'Pricing & Packages', action: 'packages' },
        { text: 'Maintenance Plans', action: 'maintenance' },
        { text: 'Contact Us', action: 'contact' }
      ]);
    },

    showSingleService(serviceKey) {
      var service = this.services[serviceKey];
      this.addMessage('bot', service.name + ': ' + service.description);
      this.addMessage('bot', 'Brands we use: ' + service.brands + '.');
      this.addMessage('bot', 'What is included: ' + service.includes);
      this.addMessage('bot', 'Typical install time: ' + service.duration + '. Pricing: ' + service.priceRange);
      this.showSuggestions([
        { text: 'Get a Quote for This', action: 'quote-' + serviceKey },
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'See All Services', action: 'services' }
      ]);
    },

    // ==================== ACTION ROUTER ====================
    handleAction(action) {
      if (action === 'quote') this.startQuoteFlow();
      else if (action.startsWith('quote-')) {
        var serviceKey = action.replace('quote-', '');
        this.state.selectedService = serviceKey;
        this.addMessage('bot', 'Let me get you a quote for ' + this.services[serviceKey].name + '. What is your name?');
        this.state.collectingField = 'name';
        this.state.collectingContext = 'quote';
        this.updatePlaceholder('Your name');
      }
      else if (action === 'booking') this.startBookingFlow();
      else if (action === 'services') this.showServicesInfo();
      else if (action === 'contact') this.showContactInfo();
      else if (action === 'packages') this.respondPackages();
      else if (action === 'financing') this.respondFinancing();
      else if (action === 'maintenance') this.respondMaintenance();
      else if (action === 'maintenance-basic') this.respondMaintenanceDetail('basic');
      else if (action === 'maintenance-priority') this.respondMaintenanceDetail('priority');
      else if (action === 'maintenance-elite') this.respondMaintenanceDetail('elite');
      else if (action === 'maintenance-signup') this.startMaintenanceSignup(null);
      else if (action.startsWith('maintenance-signup-')) {
        var tier = action.replace('maintenance-signup-', '');
        this.startMaintenanceSignup(tier);
      }
      else if (action.startsWith('maintenance-page-')) {
        var pageTier = action.replace('maintenance-page-', '');
        window.open('maintenance-' + pageTier + '.html', '_blank');
        this.addMessage('bot', 'Opening the ' + this.maintenancePlans[pageTier].name + ' plan details page.');
      }
      else if (action === 'open-booking') this.openBookingLink();
      else if (action === 'restart') this.restartChat();
      else if (action === 'goodbye') this.addMessage('bot', 'Thanks for chatting with All Things Automated! We are here whenever you need us. Have a great day.');
      else if (action.startsWith('service-')) {
        var sKey = action.replace('service-', '');
        this.handleServiceSelection(sKey);
      }
    },

    startMaintenanceSignup(tier) {
      if (tier) {
        var plan = this.maintenancePlans[tier];
        this.addMessage('bot', 'Great choice! Let me get your info to sign you up for the ' + plan.name + ' plan at ' + plan.price + '. What is your name?');
        this.state.collectingContext = 'maintenance-' + tier;
      } else {
        this.addMessage('bot', 'Which maintenance plan are you interested in?');
        this.showSuggestions([
          { text: 'Basic Care ($29/mo)', action: 'maintenance-signup-basic' },
          { text: 'Priority Care ($59/mo)', action: 'maintenance-signup-priority' },
          { text: 'Elite Care ($99/mo)', action: 'maintenance-signup-elite' }
        ]);
        return;
      }
      this.state.collectingField = 'name';
      this.updatePlaceholder('Your name');
    },

    startQuoteFlow() {
      this.addMessage('bot', 'Which service are you most interested in?');
      this.showSuggestions([
        { text: 'Smart Lighting', action: 'service-smart-lighting' },
        { text: 'Security & Cameras', action: 'service-security-cameras' },
        { text: 'Climate Control', action: 'service-climate-control' },
        { text: 'Full Home Automation', action: 'service-full-automation' },
        { text: 'Home Theater & Audio', action: 'service-home-theater' },
        { text: 'Networking / Wi-Fi', action: 'service-networking' }
      ]);
      this.state.currentScreen = 'quote-service';
    },

    handleServiceSelection(serviceKey) {
      this.state.selectedService = serviceKey;
      var serviceName = this.services[serviceKey].name;
      this.addMessage('bot', 'Great! ' + serviceName + ' -- ' + this.services[serviceKey].priceRange + '. Let me get you a personalized quote. What is your name?');
      this.state.collectingField = 'name';
      this.state.collectingContext = 'quote';
      this.updatePlaceholder('Your name');
    },

    // ==================== FIELD COLLECTION ====================
    handleFieldCollection(text) {
      var field = this.state.collectingField;

      if (field === 'name') {
        if (text.length < 2) {
          this.addMessage('bot', 'Please enter your full name.');
          return;
        }
        this.state.userName = text;
        this.addMessage('bot', 'Thanks, ' + text + '! What is your email address?');
        this.state.collectingField = 'email';
        this.updatePlaceholder('your@email.com');

      } else if (field === 'email') {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
          this.addMessage('bot', 'That does not look like a valid email. Please try again.');
          return;
        }
        this.state.userEmail = text;
        this.addMessage('bot', 'Got it! And your phone number?');
        this.state.collectingField = 'phone';
        this.updatePlaceholder('(941) 555-1234');

      } else if (field === 'phone') {
        var digits = text.replace(/\D/g, '');
        if (digits.length < 10) {
          this.addMessage('bot', 'Please enter a valid 10-digit phone number.');
          return;
        }
        this.state.userPhone = text;
        this.state.collectingField = null;
        this.updatePlaceholder('Type a message...');
        this.submitLead();
      }
    },

    updatePlaceholder(text) {
      var input = document.getElementById('ata-chat-input');
      if (input) { input.placeholder = text; input.focus(); }
    },

    // ==================== LEAD SUBMISSION ====================
    submitLead() {
      var context = this.state.collectingContext || 'quote';
      var isMaintenance = context.startsWith('maintenance-');
      var serviceName = '';
      var subject = '';

      if (isMaintenance) {
        var tier = context.replace('maintenance-', '');
        var plan = this.maintenancePlans[tier];
        serviceName = 'Maintenance Plan: ' + plan.name + ' (' + plan.price + ')';
        subject = '[MAINTENANCE SIGNUP] ' + (this.state.userName || 'Unknown') + ' - ' + plan.name;
        this.addMessage('bot', 'Submitting your ' + plan.name + ' plan signup...');
      } else {
        serviceName = this.state.selectedService ? this.services[this.state.selectedService].name : 'General Inquiry';
        subject = '[NEW LEAD] ' + (this.state.userName || 'Unknown') + ' - ' + serviceName;
        this.addMessage('bot', 'Submitting your quote request...');
      }

      var payload = {
        name: this.state.userName,
        email: this.state.userEmail,
        phone: this.state.userPhone,
        service: serviceName,
        source: isMaintenance ? 'chatbot-maintenance' : 'chatbot',
        sessionId: this.state.sessionId
      };

      var self = this;

      fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function(response) {
          if (response.ok) {
            if (isMaintenance) {
              self.addMessage('bot', 'Your ' + self.maintenancePlans[context.replace('maintenance-', '')].name + ' plan signup has been submitted! Our team will reach out within one business day to get you set up and schedule your first system checkup.');
            } else {
              self.addMessage('bot', 'Your quote request has been submitted! Our team will review your details and get back to you shortly with a customized quote for ' + serviceName + '. We typically respond within a few hours during business days.');
            }

            // Client-side email notification via FormSubmit
            fetch('https://formsubmit.co/ajax/65a6ab2ee87c151ffec81e39d824f727', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify({
                _subject: subject,
                Name: payload.name || 'Not provided',
                Email: payload.email || 'Not provided',
                Phone: payload.phone || 'Not provided',
                Service: payload.service || 'Not specified',
                Source: isMaintenance ? 'Chatbot - Maintenance Signup' : 'Chatbot Widget',
                Message: isMaintenance ? 'Client wants to sign up for a maintenance plan via chatbot' : 'Lead captured via website chatbot',
                _template: 'table'
              })
            }).catch(function() {});

            self.showSuggestions([
              { text: 'Our Services', action: 'services' },
              { text: 'Book a Service Call', action: 'booking' },
              { text: 'Start Over', action: 'restart' }
            ]);
          } else {
            throw new Error('Server error');
          }
        })
        .catch(function() {
          self.addMessage('bot', 'There was an issue submitting your request. Please call us at ' + self.config.businessPhone + ' or email ' + self.config.businessEmail + ' and we will take care of you right away.');
          self.showSuggestions([
            { text: 'Contact Us', action: 'contact' },
            { text: 'Try Again', action: 'quote' }
          ]);
        });

      this.state.collectingContext = null;
    },

    startBookingFlow() {
      this.addMessage('bot', 'A professional service call is $' + this.config.serviceCallFee + ' and includes a full smart home assessment of your property, personalized recommendations based on your home and lifestyle, and a binding quote on any work needed -- no surprises.');
      var self = this;
      setTimeout(function() {
        self.addMessage('bot', 'We are available ' + self.config.businessHours + '. ' + self.config.saturdayHours + '. Ready to book?');
        self.showSuggestions([
          { text: 'Book Now', action: 'open-booking' },
          { text: 'Get a Free Quote First', action: 'quote' },
          { text: 'Back to Menu', action: 'restart' }
        ]);
      }, 400);
      this.state.currentScreen = 'booking';
    },

    openBookingLink() {
      if (this.config.squareBookingUrl === 'SQUARE_BOOKING_URL') {
        this.addMessage('bot', 'Our online booking system is being finalized. In the meantime, you can reach us at <a href="tel:+19412635325" style="color:#3A7FC1">' + this.config.businessPhone + '</a> or <a href="mailto:' + this.config.businessEmail + '" style="color:#3A7FC1">' + this.config.businessEmail + '</a> to schedule your service call.');
      } else {
        window.open(this.config.squareBookingUrl, '_blank');
        this.addMessage('bot', 'Opening the booking system in a new window. Select a date and time that works best for you.');
      }
      var self = this;
      setTimeout(function() {
        self.showSuggestions([
          { text: 'Contact Us', action: 'contact' },
          { text: 'Back to Menu', action: 'restart' }
        ]);
      }, 500);
    },

    showServicesInfo() {
      this.addMessage('bot', 'All Things Automated offers a full range of smart home services:');
      var self = this;
      var serviceKeys = Object.keys(this.services);
      serviceKeys.forEach(function(key, i) {
        setTimeout(function() {
          var s = self.services[key];
          self.addMessage('bot', s.name + ' -- ' + s.description.split('.')[0] + '. Starts at ' + s.priceRange.split('.')[0] + '.');
        }, (i + 1) * 300);
      });
      setTimeout(function() {
        self.addMessage('bot', 'Interested in any of these? Just ask for details or pick one below for a free quote.');
        self.showSuggestions([
          { text: 'Smart Lighting', action: 'quote-smart-lighting' },
          { text: 'Security & Cameras', action: 'quote-security-cameras' },
          { text: 'Climate Control', action: 'quote-climate-control' },
          { text: 'Full Automation', action: 'quote-full-automation' },
          { text: 'Home Theater', action: 'quote-home-theater' },
          { text: 'Networking', action: 'quote-networking' }
        ]);
      }, (serviceKeys.length + 1) * 300);
      this.state.currentScreen = 'services';
    },

    showContactInfo() {
      this.addMessage('bot', 'Here is how to reach All Things Automated:');
      this.addMessage('bot', 'Phone: <a href="tel:+19412635325" style="color:#3A7FC1">' + this.config.businessPhone + '</a>');
      this.addMessage('bot', 'Email: <a href="mailto:' + this.config.businessEmail + '" style="color:#3A7FC1">' + this.config.businessEmail + '</a>');
      this.addMessage('bot', 'Website: <a href="https://itsallthingsautomated.com" target="_blank" style="color:#3A7FC1">itsallthingsautomated.com</a>');
      this.addMessage('bot', 'Hours: ' + this.config.businessHours + '. ' + this.config.saturdayHours + '.');
      this.addMessage('bot', 'Service Area: ' + this.config.serviceArea);
      var self = this;
      setTimeout(function() {
        self.showSuggestions([
          { text: 'Get a Free Quote', action: 'quote' },
          { text: 'Book a Service Call', action: 'booking' },
          { text: 'Our Services', action: 'services' }
        ]);
      }, 300);
      this.state.currentScreen = 'contact';
    },

    restartChat() {
      this.state.currentScreen = 'greeting';
      this.state.userName = '';
      this.state.userEmail = '';
      this.state.userPhone = '';
      this.state.selectedService = '';
      this.state.collectingField = null;
      this.state.collectingContext = null;
      this.state.messages = [];
      document.getElementById('ata-chat-messages').innerHTML = '';
      this.clearSuggestions();
      this.updatePlaceholder('Type a message...');
      this.showGreeting();
    },

    scrollToBottom() {
      var container = document.getElementById('ata-chat-messages');
      if (container) container.scrollTop = container.scrollHeight;
    },

    // ==================== STYLES ====================
    injectStyles() {
      var c = this.config;
      var style = document.createElement('style');
      style.textContent = '#ata-chatbot-widget *{box-sizing:border-box}' +
        '.ata-chat-widget{position:fixed;bottom:20px;right:20px;font-family:var(--font-body,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,sans-serif);z-index:9999}' +
        '.ata-chat-toggle{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,' + c.primaryColor + ',' + c.accentBlue + ');border:none;color:' + c.lightText + ';cursor:pointer;box-shadow:0 4px 20px rgba(58,127,193,0.4);display:flex;align-items:center;justify-content:center;transition:all .3s ease;padding:0}' +
        '.ata-chat-toggle:hover{transform:scale(1.1);box-shadow:0 6px 30px rgba(58,127,193,0.6)}' +
        '.ata-chat-toggle.active{display:none}' +
        '.ata-chat-toggle svg{width:28px;height:28px;stroke-linecap:round;stroke-linejoin:round}' +
        '.ata-chat-window{position:absolute;bottom:80px;right:0;width:420px;height:620px;background:' + c.darkBg + ';border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.5),0 0 1px rgba(0,0,0,0.3);display:none;flex-direction:column;border:1px solid ' + c.borderColor + ';animation:ataSlideUp .3s ease}' +
        '@keyframes ataSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}' +
        '.ata-chat-header{background:linear-gradient(135deg,' + c.darkBg + ',#1a1f26);padding:16px 20px;border-bottom:1px solid ' + c.borderColor + ';display:flex;justify-content:space-between;align-items:center;border-radius:16px 16px 0 0}' +
        '.ata-chat-header-left{display:flex;align-items:center;gap:12px}' +
        '.ata-chat-status-dot{width:10px;height:10px;border-radius:50%;background:#22c55e;box-shadow:0 0 6px rgba(34,197,94,0.5);flex-shrink:0}' +
        '.ata-chat-title{color:' + c.lightText + ';font-size:16px;font-weight:600;letter-spacing:-0.3px;line-height:1.2}' +
        '.ata-chat-subtitle{color:#888;font-size:12px;font-weight:400}' +
        '.ata-chat-close{background:none;border:none;color:' + c.lightText + ';cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;transition:opacity .2s}' +
        '.ata-chat-close:hover{opacity:.7}' +
        '.ata-chat-close svg{width:20px;height:20px;stroke-linecap:round;stroke-linejoin:round}' +
        '.ata-chat-messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:10px}' +
        '.ata-message{animation:ataFadeIn .3s ease;word-wrap:break-word}' +
        '@keyframes ataFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
        '.ata-message-bot{background:' + c.borderColor + ';color:' + c.lightText + ';padding:10px 14px;border-radius:12px;border-bottom-left-radius:4px;max-width:85%;font-size:14px;line-height:1.5;align-self:flex-start}' +
        '.ata-message-bot a{color:' + c.primaryColor + ';text-decoration:none}' +
        '.ata-message-bot a:hover{text-decoration:underline}' +
        '.ata-message-user{background:' + c.primaryColor + ';color:' + c.lightText + ';padding:10px 14px;border-radius:12px;border-bottom-right-radius:4px;max-width:85%;font-size:14px;line-height:1.5;align-self:flex-end}' +
        '.ata-chat-suggestions{padding:0 16px;min-height:0}' +
        '.ata-suggestions-row{display:flex;flex-wrap:wrap;gap:6px;padding:8px 0}' +
        '.ata-suggestion-btn{background:none;border:1px solid ' + c.primaryColor + ';color:' + c.primaryColor + ';padding:6px 14px;border-radius:20px;cursor:pointer;font-size:12px;font-weight:500;transition:all .2s;white-space:nowrap}' +
        '.ata-suggestion-btn:hover{background:' + c.primaryColor + ';color:' + c.lightText + '}' +
        '.ata-chat-input-bar{padding:12px 16px;border-top:1px solid ' + c.borderColor + ';display:flex;gap:8px;align-items:center}' +
        '.ata-chat-text-input{flex:1;background:' + c.borderColor + ';border:1px solid ' + c.borderColor + ';color:' + c.lightText + ';padding:10px 14px;border-radius:24px;font-size:14px;font-family:inherit;transition:border-color .2s}' +
        '.ata-chat-text-input:focus{outline:none;border-color:' + c.primaryColor + ';background:rgba(58,127,193,0.05)}' +
        '.ata-chat-text-input::placeholder{color:#666}' +
        '.ata-chat-send-btn{width:40px;height:40px;border-radius:50%;background:' + c.primaryColor + ';border:none;color:' + c.lightText + ';cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;padding:0}' +
        '.ata-chat-send-btn:hover{background:#2a6aa8;transform:scale(1.05)}' +
        '.ata-chat-send-btn svg{width:18px;height:18px;stroke-linecap:round;stroke-linejoin:round}' +
        '.ata-chat-footer{padding:10px 20px;font-size:11px;color:#555;text-align:center;border-top:1px solid ' + c.borderColor + ';background:rgba(13,17,23,0.5);border-radius:0 0 16px 16px}' +
        '.ata-chat-messages::-webkit-scrollbar{width:6px}' +
        '.ata-chat-messages::-webkit-scrollbar-track{background:transparent}' +
        '.ata-chat-messages::-webkit-scrollbar-thumb{background:' + c.borderColor + ';border-radius:3px}' +
        '.ata-chat-messages::-webkit-scrollbar-thumb:hover{background:' + c.primaryColor + '}' +
        '@media(max-width:480px){.ata-chat-window{width:calc(100vw - 20px);height:calc(100vh - 100px);max-height:620px;right:10px;bottom:80px}.ata-message-bot,.ata-message-user{max-width:100%}.ata-suggestions-row{flex-wrap:wrap}}';
      document.head.appendChild(style);
    }
  };

  window.ATAChatbot = ATAChatbot;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { ATAChatbot.init(); });
  } else {
    ATAChatbot.init();
  }
})();
