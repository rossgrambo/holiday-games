/**
 * Holiday Resources Manager
 * Automatically switches holiday themes based on the current month
 * All holiday-specific strings, emojis, and configurations are centralized here
 */

class HolidayResources {
    constructor() {
        this.currentMonth = new Date().getMonth(); // 0-11
        this.currentHoliday = this.determineHoliday();
    }
    
    determineHoliday() {
        // October = Halloween (month 9)
        // November = Thanksgiving (month 10)
        // December = Christmas (month 11)
        // January = New Year (month 0)
        // February = Valentine's (month 1)
        // March = St. Patrick's (month 2)
        // April = Easter (month 3)
        // May = Spring (month 4)
        // June = Summer (month 5)
        // July = Independence Day (month 6)
        // August = Summer (month 7)
        // September = Fall (month 8)
        
        switch(this.currentMonth) {
            case 9: return 'halloween';
            case 10: return 'thanksgiving';
            case 11: return 'christmas';
            case 0: return 'newyear';
            case 1: return 'valentines';
            case 2: return 'stpatricks';
            case 3: return 'easter';
            case 4: return 'spring';
            case 5: return 'summer';
            case 6: return 'independence';
            case 7: return 'summer';
            case 8: return 'fall';
            default: return 'halloween';
        }
    }
    
    // Gallery Page Resources
    getGalleryTitle() {
        const titles = {
            halloween: '🎃 Halloween Games',
            thanksgiving: '🦃 Thanksgiving Games',
            christmas: '🎄 Christmas Games',
            newyear: '🎆 New Year Games',
            valentines: '💝 Valentine\'s Games',
            stpatricks: '☘️ St. Patrick\'s Games',
            easter: '🐰 Easter Games',
            spring: '🌸 Spring Games',
            summer: '☀️ Summer Games',
            independence: '🎆 Independence Day Games',
            fall: '🍂 Fall Games'
        };
        return titles[this.currentHoliday];
    }
    
    getGallerySubtitle() {
        const subtitles = {
            halloween: 'Spooky touch-friendly games for tablets',
            thanksgiving: 'Festive touch-friendly games for tablets',
            christmas: 'Merry touch-friendly games for tablets',
            newyear: 'Celebratory touch-friendly games for tablets',
            valentines: 'Lovely touch-friendly games for tablets',
            stpatricks: 'Lucky touch-friendly games for tablets',
            easter: 'Egg-citing touch-friendly games for tablets',
            spring: 'Blooming touch-friendly games for tablets',
            summer: 'Sunny touch-friendly games for tablets',
            independence: 'Patriotic touch-friendly games for tablets',
            fall: 'Colorful touch-friendly games for tablets'
        };
        return subtitles[this.currentHoliday];
    }
    
    // Run Game Resources
    getRunGameTitle() {
        const titles = {
            halloween: '🧟‍♂️ Zombie Escape!',
            thanksgiving: '🦃 Turkey Dash!',
            christmas: '🎅 Santa Sprint!',
            newyear: '🎉 Countdown Rush!',
            valentines: '💘 Cupid Chase!',
            stpatricks: '🍀 Leprechaun Run!',
            easter: '🐰 Bunny Hop!',
            spring: '🌺 Flower Sprint!',
            summer: '🏖️ Beach Dash!',
            independence: '🎆 Fireworks Rush!',
            fall: '🍁 Leaf Runner!'
        };
        return titles[this.currentHoliday];
    }
    
    getRunGameDescription() {
        const descriptions = {
            halloween: 'Sprint through the haunted graveyard before the undead catch you!',
            thanksgiving: 'Run through the cornfield before dinner time!',
            christmas: 'Deliver presents before morning arrives!',
            newyear: 'Race to midnight before time runs out!',
            valentines: 'Spread love before the day ends!',
            stpatricks: 'Find the pot of gold before sunset!',
            easter: 'Collect eggs before the hunt ends!',
            spring: 'Gather flowers before they wilt!',
            summer: 'Race to the beach before it closes!',
            independence: 'Light all fireworks before midnight!',
            fall: 'Collect leaves before winter comes!'
        };
        return descriptions[this.currentHoliday];
    }
    
    getRunGameIcon() {
        const icons = {
            halloween: '🧟‍♂️',
            thanksgiving: '🦃',
            christmas: '🎅',
            newyear: '🎉',
            valentines: '💘',
            stpatricks: '🍀',
            easter: '🐰',
            spring: '🌺',
            summer: '🏖️',
            independence: '🎆',
            fall: '🍁'
        };
        return icons[this.currentHoliday];
    }
    
    getRunGameWarning() {
        const warnings = {
            halloween: '🧟 THE UNDEAD ARE COMING! 🧟',
            thanksgiving: '🦃 THE TURKEY IS COMING! 🦃',
            christmas: '🎅 SANTA IS COMING! 🎅',
            newyear: '🕛 MIDNIGHT APPROACHES! 🕛',
            valentines: '💘 CUPID IS NEAR! 💘',
            stpatricks: '🍀 THE LEPRECHAUN IS CLOSE! 🍀',
            easter: '🐰 THE BUNNY IS HOPPING NEAR! 🐰',
            spring: '🌺 FLOWERS ARE WILTING! 🌺',
            summer: '☀️ THE SUN IS SETTING! ☀️',
            independence: '🎆 FIREWORKS LAUNCHING! 🎆',
            fall: '🍁 WINTER IS COMING! 🍁'
        };
        return warnings[this.currentHoliday];
    }
    
    // Jump Game Resources
    getJumpGameTitle() {
        const titles = {
            halloween: '💀 Skeleton Jump!',
            thanksgiving: '🥧 Pie Jump!',
            christmas: '⛄ Snowman Jump!',
            newyear: '🎊 Confetti Jump!',
            valentines: '💝 Heart Jump!',
            stpatricks: '☘️ Shamrock Jump!',
            easter: '🥚 Egg Jump!',
            spring: '🌷 Tulip Jump!',
            summer: '🌊 Wave Jump!',
            independence: '🇺🇸 Flag Jump!',
            fall: '🍂 Leaf Jump!'
        };
        return titles[this.currentHoliday];
    }
    
    getJumpGameDescription() {
        const descriptions = {
            halloween: 'Guide the spooky skeleton over jack-o\'-lanterns in this bone-chilling adventure!',
            thanksgiving: 'Jump over pies in this delicious adventure!',
            christmas: 'Hop over presents in this merry journey!',
            newyear: 'Leap over champagne bottles in this bubbly quest!',
            valentines: 'Jump over chocolate boxes in this sweet challenge!',
            stpatricks: 'Bounce over rainbows in this lucky adventure!',
            easter: 'Spring over baskets in this colorful journey!',
            spring: 'Skip over flowers in this blooming challenge!',
            summer: 'Leap over sandcastles in this beachy adventure!',
            independence: 'Jump over sparklers in this patriotic quest!',
            fall: 'Hop over pumpkins in this harvest journey!'
        };
        return descriptions[this.currentHoliday];
    }
    
    getJumpGameIcon() {
        const icons = {
            halloween: '💀',
            thanksgiving: '🥧',
            christmas: '⛄',
            newyear: '🎊',
            valentines: '💝',
            stpatricks: '☘️',
            easter: '🥚',
            spring: '🌷',
            summer: '🌊',
            independence: '🇺🇸',
            fall: '🍂'
        };
        return icons[this.currentHoliday];
    }
    
    getJumpInstruction() {
        const instructions = {
            halloween: '💀 TAP TO JUMP! 💀',
            thanksgiving: '🦃 TAP TO JUMP! 🦃',
            christmas: '🎄 TAP TO JUMP! 🎄',
            newyear: '🎆 TAP TO JUMP! 🎆',
            valentines: '💝 TAP TO JUMP! 💝',
            stpatricks: '☘️ TAP TO JUMP! ☘️',
            easter: '🐰 TAP TO JUMP! 🐰',
            spring: '🌸 TAP TO JUMP! 🌸',
            summer: '☀️ TAP TO JUMP! ☀️',
            independence: '🎆 TAP TO JUMP! 🎆',
            fall: '🍁 TAP TO JUMP! 🍁'
        };
        return instructions[this.currentHoliday];
    }
    
    // Taxes Game Resources
    getTaxesGameTitle() {
        const titles = {
            halloween: '🧙‍♀️ Taxes',
            thanksgiving: '📝 Gratitude List',
            christmas: '🎁 Gift Registry',
            newyear: '📋 Resolutions',
            valentines: '💌 Love Letters',
            stpatricks: '🍀 Wish List',
            easter: '🥚 Egg Hunt Log',
            spring: '🌱 Garden Planner',
            summer: '🏖️ Vacation Plans',
            independence: '🎆 Event Schedule',
            fall: '🍂 Harvest Inventory'
        };
        return titles[this.currentHoliday];
    }
    
    getTaxesGameDescription() {
        const descriptions = {
            halloween: 'Help the witch complete her magical paperwork before midnight strikes!',
            thanksgiving: 'List everything you\'re thankful for before dinner!',
            christmas: 'Register all gifts before Santa arrives!',
            newyear: 'Write your resolutions before midnight!',
            valentines: 'Write love letters before Valentine\'s Day ends!',
            stpatricks: 'Make your wishes before the rainbow fades!',
            easter: 'Log all eggs before the hunt ends!',
            spring: 'Plan your garden before planting season ends!',
            summer: 'Plan your vacation before summer ends!',
            independence: 'Schedule all events before the fireworks!',
            fall: 'Count your harvest before winter arrives!'
        };
        return descriptions[this.currentHoliday];
    }
    
    getTaxesGameIcon() {
        const icons = {
            halloween: '🧙‍♀️',
            thanksgiving: '📝',
            christmas: '🎁',
            newyear: '📋',
            valentines: '💌',
            stpatricks: '🍀',
            easter: '🥚',
            spring: '🌱',
            summer: '🏖️',
            independence: '🎆',
            fall: '🍂'
        };
        return icons[this.currentHoliday];
    }
    
    getTaxesFormHeader() {
        const headers = {
            halloween: '✨ Magical Registry & Spell License Application ✨',
            thanksgiving: '🦃 Gratitude & Blessing Documentation Form 🦃',
            christmas: '🎄 Gift Registration & Nice List Application 🎄',
            newyear: '🎆 Resolution Declaration & Goal Registration 🎆',
            valentines: '💝 Love Declaration & Affection Registration 💝',
            stpatricks: '☘️ Luck Application & Wish Registration ☘️',
            easter: '🐰 Egg Hunt Log & Basket Inventory Form 🐰',
            spring: '🌸 Garden Planning & Seed Registration 🌸',
            summer: '☀️ Vacation Booking & Activity Schedule ☀️',
            independence: '🎆 Event Planning & Celebration Registration 🎆',
            fall: '🍂 Harvest Inventory & Preservation Planning 🍂'
        };
        return headers[this.currentHoliday];
    }
    
    getTaxesFormYear() {
        const years = {
            halloween: 'Halloween 2025',
            thanksgiving: 'Thanksgiving 2025',
            christmas: 'Christmas 2025',
            newyear: 'New Year 2026',
            valentines: 'Valentine\'s Day 2025',
            stpatricks: 'St. Patrick\'s Day 2025',
            easter: 'Easter 2025',
            spring: 'Spring 2025',
            summer: 'Summer 2025',
            independence: 'Independence Day 2025',
            fall: 'Fall 2025'
        };
        return years[this.currentHoliday];
    }
    
    // Difficulty Levels
    getDifficultyIcons() {
        const icons = {
            halloween: { easy: '👻', medium: '🎃', hard: '🧟', crazy: '💀' },
            thanksgiving: { easy: '🌽', medium: '🦃', hard: '🥧', crazy: '🍗' },
            christmas: { easy: '⛄', medium: '🎄', hard: '🎅', crazy: '🦌' },
            newyear: { easy: '🎊', medium: '🎉', hard: '🥂', crazy: '🎆' },
            valentines: { easy: '💕', medium: '💝', hard: '💘', crazy: '💖' },
            stpatricks: { easy: '🍀', medium: '☘️', hard: '🌈', crazy: '🎩' },
            easter: { easy: '🐣', medium: '🐰', hard: '🥚', crazy: '🎀' },
            spring: { easy: '🌱', medium: '🌸', hard: '🌺', crazy: '🦋' },
            summer: { easy: '🌊', medium: '☀️', hard: '🏖️', crazy: '🍉' },
            independence: { easy: '🎈', medium: '🎆', hard: '🇺🇸', crazy: '🎇' },
            fall: { easy: '🍂', medium: '🍁', hard: '🎃', crazy: '🌾' }
        };
        return icons[this.currentHoliday];
    }
    
    // Run Game Difficulty Names
    getRunDifficultyNames() {
        const names = {
            halloween: { easy: 'Friendly Ghost', medium: 'Jack-o\'-Lantern', hard: 'Zombie Horde', crazy: 'NIGHTMARE' },
            thanksgiving: { easy: 'Gentle Breeze', medium: 'Turkey Trot', hard: 'Feast Rush', crazy: 'FOOD COMA' },
            christmas: { easy: 'Snow Angel', medium: 'Reindeer Dash', hard: 'Blizzard Run', crazy: 'SANTA\'S SLEIGH' },
            newyear: { easy: 'Midnight Stroll', medium: 'Party Hustle', hard: 'Countdown Sprint', crazy: 'TIME WARP' },
            valentines: { easy: 'Cupid\'s Walk', medium: 'Love Chase', hard: 'Heart Race', crazy: 'LOVE OVERDRIVE' },
            stpatricks: { easy: 'Lucky Step', medium: 'Rainbow Run', hard: 'Gold Rush', crazy: 'LEPRECHAUN SPEED' },
            easter: { easy: 'Bunny Hop', medium: 'Egg Hunt', hard: 'Basket Sprint', crazy: 'EASTER RUSH' },
            spring: { easy: 'Petal Drift', medium: 'Bloom Run', hard: 'Garden Dash', crazy: 'FLOWER POWER' },
            summer: { easy: 'Beach Walk', medium: 'Wave Run', hard: 'Heat Sprint', crazy: 'HEATWAVE' },
            independence: { easy: 'Sparkler', medium: 'Firecracker', hard: 'Rocket Rush', crazy: 'FIREWORKS FINALE' },
            fall: { easy: 'Leaf Drift', medium: 'Harvest Jog', hard: 'Autumn Sprint', crazy: 'HARVEST STORM' }
        };
        return names[this.currentHoliday];
    }
    
    getRunDifficultyDescriptions() {
        const descriptions = {
            halloween: { easy: 'Slow shamble', medium: 'Getting spooky', hard: 'Real terror', crazy: 'Pure horror!' },
            thanksgiving: { easy: 'Leisurely pace', medium: 'Picking up speed', hard: 'Racing to dinner', crazy: 'Unstoppable!' },
            christmas: { easy: 'Gentle flurries', medium: 'Steady pace', hard: 'Rushing deliveries', crazy: 'Lightning fast!' },
            newyear: { easy: 'Casual party', medium: 'Getting festive', hard: 'Midnight rush', crazy: 'Time flies!' },
            valentines: { easy: 'Romantic stroll', medium: 'Love accelerates', hard: 'Passion rush', crazy: 'Heart pounding!' },
            stpatricks: { easy: 'Lucky walk', medium: 'Chasing rainbows', hard: 'Gold fever', crazy: 'Pure luck!' },
            easter: { easy: 'Gentle hops', medium: 'Egg hunting', hard: 'Basket filling', crazy: 'Bunny speed!' },
            spring: { easy: 'Gentle breeze', medium: 'Blooming fast', hard: 'Growth spurt', crazy: 'Explosive growth!' },
            summer: { easy: 'Relaxed pace', medium: 'Warming up', hard: 'Scorching speed', crazy: 'Blazing hot!' },
            independence: { easy: 'Gentle spark', medium: 'Fiery pace', hard: 'Explosive speed', crazy: 'Grand finale!' },
            fall: { easy: 'Gentle fall', medium: 'Leaves flying', hard: 'Harvest rush', crazy: 'Storm speed!' }
        };
        return descriptions[this.currentHoliday];
    }
    
    // Jump Game Difficulty Names
    getJumpDifficultyNames() {
        const names = {
            halloween: { easy: 'Baby Bones', medium: 'Pumpkin Patch', hard: 'Haunted Ground', crazy: 'SKELETON KING' },
            thanksgiving: { easy: 'Baby Turkey', medium: 'Cornfield', hard: 'Feast Table', crazy: 'TURKEY KING' },
            christmas: { easy: 'Snowflake', medium: 'Gift Pile', hard: 'Chimney Climb', crazy: 'NORTH POLE' },
            newyear: { easy: 'First Jump', medium: 'Party Hop', hard: 'Midnight Leap', crazy: 'TIME JUMPER' },
            valentines: { easy: 'Sweet Hop', medium: 'Heart Skip', hard: 'Love Leap', crazy: 'CUPID MASTER' },
            stpatricks: { easy: 'Clover Hop', medium: 'Rainbow Jump', hard: 'Pot of Gold', crazy: 'LUCKY LEGEND' },
            easter: { easy: 'Egg Roll', medium: 'Bunny Bounce', hard: 'Basket Jump', crazy: 'EGG MASTER' },
            spring: { easy: 'Seedling', medium: 'Flower Field', hard: 'Garden Leap', crazy: 'BLOOM MASTER' },
            summer: { easy: 'Sandcastle', medium: 'Wave Jump', hard: 'Surf Leap', crazy: 'BEACH LEGEND' },
            independence: { easy: 'Sparkler Jump', medium: 'Flag Leap', hard: 'Rocket Jump', crazy: 'FREEDOM FLYER' },
            fall: { easy: 'Leaf Pile', medium: 'Haystack', hard: 'Harvest Jump', crazy: 'AUTUMN LORD' }
        };
        return names[this.currentHoliday];
    }
    
    getJumpDifficultyDescriptions() {
        const descriptions = {
            halloween: { easy: 'Tiny hops', medium: 'More pumpkins', hard: 'Bone-breaking', crazy: 'Impossible!' },
            thanksgiving: { easy: 'Small jumps', medium: 'More corn', hard: 'Table chaos', crazy: 'Unstoppable!' },
            christmas: { easy: 'Gentle jumps', medium: 'More gifts', hard: 'Chimney rush', crazy: 'Legendary!' },
            newyear: { easy: 'Easy leaps', medium: 'Party chaos', hard: 'Countdown jumps', crazy: 'Beyond time!' },
            valentines: { easy: 'Gentle hops', medium: 'More hearts', hard: 'Love challenge', crazy: 'Pure love!' },
            stpatricks: { easy: 'Lucky jumps', medium: 'Rainbow path', hard: 'Gold rush', crazy: 'Maximum luck!' },
            easter: { easy: 'Easy rolls', medium: 'More eggs', hard: 'Basket chaos', crazy: 'Egg-streme!' },
            spring: { easy: 'Small sprouts', medium: 'Blooming fast', hard: 'Garden chaos', crazy: 'Full bloom!' },
            summer: { easy: 'Small waves', medium: 'Bigger surf', hard: 'Tidal waves', crazy: 'Hurricane!' },
            independence: { easy: 'Small sparks', medium: 'Flag forest', hard: 'Rocket field', crazy: 'Firework storm!' },
            fall: { easy: 'Few leaves', medium: 'More leaves', hard: 'Leaf storm', crazy: 'Harvest chaos!' }
        };
        return descriptions[this.currentHoliday];
    }
    
    // Taxes Game Difficulty Names
    getTaxesDifficultyNames() {
        const names = {
            halloween: { easy: 'Apprentice', medium: 'Novice Witch', hard: 'Master Witch', crazy: 'DARK SORCERER' },
            thanksgiving: { easy: 'Kitchen Helper', medium: 'Cook', hard: 'Head Chef', crazy: 'FEAST MASTER' },
            christmas: { easy: 'Elf', medium: 'Workshop Manager', hard: 'Head Elf', crazy: 'SANTA\'S RIGHT HAND' },
            newyear: { easy: 'Party Planner', medium: 'Event Coordinator', hard: 'Celebration Master', crazy: 'TIME KEEPER' },
            valentines: { easy: 'Secret Admirer', medium: 'Romantic', hard: 'Love Expert', crazy: 'CUPID\'S ASSISTANT' },
            stpatricks: { easy: 'Shamrock Seeker', medium: 'Lucky One', hard: 'Rainbow Finder', crazy: 'LEPRECHAUN KING' },
            easter: { easy: 'Egg Collector', medium: 'Basket Filler', hard: 'Hunt Master', crazy: 'EASTER BUNNY' },
            spring: { easy: 'Gardener', medium: 'Botanist', hard: 'Master Gardener', crazy: 'NATURE\'S CHOSEN' },
            summer: { easy: 'Beachgoer', medium: 'Lifeguard', hard: 'Beach Master', crazy: 'SUMMER KING' },
            independence: { easy: 'Citizen', medium: 'Patriot', hard: 'Freedom Fighter', crazy: 'FOUNDING FATHER' },
            fall: { easy: 'Gatherer', medium: 'Farmer', hard: 'Harvest Master', crazy: 'AUTUMN KING' }
        };
        return names[this.currentHoliday];
    }
    
    getTaxesDifficultyDescriptions() {
        const descriptions = {
            halloween: { easy: 'Simple spells', medium: 'Basic potions', hard: 'Complex magic', crazy: 'Forbidden arts!' },
            thanksgiving: { easy: 'Simple recipes', medium: 'Main courses', hard: 'Full feast', crazy: 'Everything!' },
            christmas: { easy: 'Few gifts', medium: 'Many gifts', hard: 'All the gifts', crazy: 'Worldwide!' },
            newyear: { easy: 'Small party', medium: 'Big party', hard: 'City party', crazy: 'World party!' },
            valentines: { easy: 'One card', medium: 'Many cards', hard: 'Love letters', crazy: 'Endless love!' },
            stpatricks: { easy: 'Find clover', medium: 'Find rainbow', hard: 'Find gold', crazy: 'All wishes!' },
            easter: { easy: 'Few eggs', medium: 'Many eggs', hard: 'Full basket', crazy: 'All eggs!' },
            spring: { easy: 'Few flowers', medium: 'Garden beds', hard: 'Full garden', crazy: 'Forest!' },
            summer: { easy: 'Beach basics', medium: 'Full day', hard: 'Summer plans', crazy: 'Endless summer!' },
            independence: { easy: 'Sparklers', medium: 'Fireworks', hard: 'Grand show', crazy: 'Ultimate display!' },
            fall: { easy: 'Small harvest', medium: 'Big harvest', hard: 'Full harvest', crazy: 'Bounty!' }
        };
        return descriptions[this.currentHoliday];
    }
    
    // Coming Soon Card
    getComingSoonIcon() {
        const icons = {
            halloween: '🦇',
            thanksgiving: '🌽',
            christmas: '🔔',
            newyear: '🍾',
            valentines: '💐',
            stpatricks: '🎩',
            easter: '🌷',
            spring: '🌼',
            summer: '🦩',
            independence: '🎇',
            fall: '🌻'
        };
        return icons[this.currentHoliday];
    }
    
    getComingSoonTitle() {
        const titles = {
            halloween: 'More Scares Coming',
            thanksgiving: 'More Feasts Coming',
            christmas: 'More Gifts Coming',
            newyear: 'More Celebrations Coming',
            valentines: 'More Love Coming',
            stpatricks: 'More Luck Coming',
            easter: 'More Eggs Coming',
            spring: 'More Blooms Coming',
            summer: 'More Fun Coming',
            independence: 'More Fireworks Coming',
            fall: 'More Harvests Coming'
        };
        return titles[this.currentHoliday];
    }
    
    getComingSoonDescription() {
        const descriptions = {
            halloween: 'More haunting games brewing in our cauldron!',
            thanksgiving: 'More festive games cooking in our kitchen!',
            christmas: 'More merry games wrapping in our workshop!',
            newyear: 'More celebratory games counting down!',
            valentines: 'More romantic games in the works!',
            stpatricks: 'More lucky games at the end of the rainbow!',
            easter: 'More egg-citing games hiding in baskets!',
            spring: 'More blooming games growing in our garden!',
            summer: 'More sunny games on the horizon!',
            independence: 'More patriotic games launching soon!',
            fall: 'More colorful games falling into place!'
        };
        return descriptions[this.currentHoliday];
    }
    
    // Reward Messages
    getRewardEmoji() {
        const emojis = {
            halloween: '🎃',
            thanksgiving: '🦃',
            christmas: '🎁',
            newyear: '🎆',
            valentines: '💝',
            stpatricks: '🍀',
            easter: '🥚',
            spring: '🌸',
            summer: '☀️',
            independence: '🎆',
            fall: '🍁'
        };
        return emojis[this.currentHoliday];
    }
    
    getRewardTitle() {
        const titles = {
            halloween: 'Spook-tacular Victory!',
            thanksgiving: 'Feast-tastic Victory!',
            christmas: 'Merry Victory!',
            newyear: 'Happy Victory!',
            valentines: 'Lovely Victory!',
            stpatricks: 'Lucky Victory!',
            easter: 'Egg-cellent Victory!',
            spring: 'Blooming Victory!',
            summer: 'Sunny Victory!',
            independence: 'Patriotic Victory!',
            fall: 'Colorful Victory!'
        };
        return titles[this.currentHoliday];
    }
    
    getRewardMessage(gameName) {
        const messages = {
            halloween: `You've conquered the haunting challenge of <strong>${gameName}</strong>!`,
            thanksgiving: `You've mastered the festive challenge of <strong>${gameName}</strong>!`,
            christmas: `You've completed the merry challenge of <strong>${gameName}</strong>!`,
            newyear: `You've celebrated the challenge of <strong>${gameName}</strong>!`,
            valentines: `You've loved the challenge of <strong>${gameName}</strong>!`,
            stpatricks: `You've found luck in the challenge of <strong>${gameName}</strong>!`,
            easter: `You've hopped through the challenge of <strong>${gameName}</strong>!`,
            spring: `You've bloomed through the challenge of <strong>${gameName}</strong>!`,
            summer: `You've shined through the challenge of <strong>${gameName}</strong>!`,
            independence: `You've celebrated the challenge of <strong>${gameName}</strong>!`,
            fall: `You've harvested success in the challenge of <strong>${gameName}</strong>!`
        };
        return messages[this.currentHoliday];
    }
    
    getScoreLabel() {
        const labels = {
            halloween: 'Haunting Score',
            thanksgiving: 'Festive Score',
            christmas: 'Merry Score',
            newyear: 'Celebration Score',
            valentines: 'Love Score',
            stpatricks: 'Luck Score',
            easter: 'Egg Score',
            spring: 'Bloom Score',
            summer: 'Sunshine Score',
            independence: 'Patriotic Score',
            fall: 'Harvest Score'
        };
        return labels[this.currentHoliday];
    }
    
    getDifficultyLabel() {
        const labels = {
            halloween: 'Spooky Difficulty',
            thanksgiving: 'Festive Difficulty',
            christmas: 'Merry Difficulty',
            newyear: 'Party Difficulty',
            valentines: 'Romance Difficulty',
            stpatricks: 'Lucky Difficulty',
            easter: 'Hoppy Difficulty',
            spring: 'Blooming Difficulty',
            summer: 'Sunny Difficulty',
            independence: 'Patriotic Difficulty',
            fall: 'Harvest Difficulty'
        };
        return labels[this.currentHoliday];
    }
    
    getContinueButtonText() {
        const texts = {
            halloween: 'Continue Haunting',
            thanksgiving: 'Continue Feasting',
            christmas: 'Continue Celebrating',
            newyear: 'Continue Partying',
            valentines: 'Continue Loving',
            stpatricks: 'Continue Lucky Streak',
            easter: 'Continue Hunting',
            spring: 'Continue Blooming',
            summer: 'Continue Playing',
            independence: 'Continue Celebrating',
            fall: 'Continue Harvesting'
        };
        return texts[this.currentHoliday];
    }
    
    getReturnButtonText() {
        const texts = {
            halloween: 'Return to Coven',
            thanksgiving: 'Return to Feast',
            christmas: 'Return to Workshop',
            newyear: 'Return to Party',
            valentines: 'Return to Hearts',
            stpatricks: 'Return to Rainbow',
            easter: 'Return to Basket',
            spring: 'Return to Garden',
            summer: 'Return to Beach',
            independence: 'Return to Celebration',
            fall: 'Return to Harvest'
        };
        return texts[this.currentHoliday];
    }
    
    // Falling Sprites
    getSpriteTypes() {
        const sprites = {
            halloween: ['skull', 'pumpkin'],
            thanksgiving: ['pumpkin', 'turkey'],
            christmas: ['snowflake', 'ornament'],
            newyear: ['confetti', 'firework'],
            valentines: ['heart', 'rose'],
            stpatricks: ['shamrock', 'coin'],
            easter: ['egg', 'bunny'],
            spring: ['flower', 'butterfly'],
            summer: ['sun', 'beach-ball'],
            independence: ['star', 'flag'],
            fall: ['leaf', 'pumpkin']
        };
        return sprites[this.currentHoliday];
    }
    
    // Check if sprite exists, fallback to emoji if not
    getSpriteDisplay(spriteType) {
        // Map sprite types to fallback emojis when image doesn't exist
        const emojiMap = {
            skull: '💀',
            pumpkin: '🎃',
            turkey: '🦃',
            corn: '🌽',
            snowflake: '❄️',
            ornament: '🎄',
            confetti: '🎊',
            firework: '🎆',
            heart: '💝',
            rose: '🌹',
            shamrock: '☘️',
            coin: '🪙',
            egg: '🥚',
            bunny: '🐰',
            flower: '🌸',
            butterfly: '🦋',
            sun: '☀️',
            'beach-ball': '🏖️',
            star: '⭐',
            flag: '🇺🇸',
            leaf: '🍂',
            acorn: '🌰'
        };
        return emojiMap[spriteType] || '✨';
    }
    
    // Available sprite images (ones that exist in sprites folder)
    getAvailableSpriteImages() {
        return ['skull', 'pumpkin', 'turkey'];
    }
    
    hasImageSprite(spriteType) {
        return this.getAvailableSpriteImages().includes(spriteType);
    }
    
    // Local Storage Key
    getAchievementsStorageKey() {
        return `${this.currentHoliday}GamesAchievements`;
    }
    
    // Console Messages
    getConsoleVictoryMessage() {
        const messages = {
            halloween: '🎃 Spook-tacular!',
            thanksgiving: '🦃 Feast-tastic!',
            christmas: '🎄 Merry Success!',
            newyear: '🎆 Happy Victory!',
            valentines: '💝 Love Wins!',
            stpatricks: '🍀 Lucky Winner!',
            easter: '🥚 Egg-cellent!',
            spring: '🌸 Blooming Victory!',
            summer: '☀️ Sunny Success!',
            independence: '🎆 Patriotic Win!',
            fall: '🍁 Harvest Victory!'
        };
        return messages[this.currentHoliday];
    }
    
    // Victory Messages for Run Game
    getRunVictoryMessage() {
        const messages = {
            halloween: 'You escaped the graveyard! The zombie couldn\'t catch you!',
            thanksgiving: 'You made it to dinner! The turkey couldn\'t catch you!',
            christmas: 'You delivered all the presents! Santa is proud!',
            newyear: 'You made it to midnight! Happy New Year!',
            valentines: 'You spread all the love! Cupid is impressed!',
            stpatricks: 'You found the pot of gold! Lucky you!',
            easter: 'You collected all the eggs! The bunny is amazed!',
            spring: 'You gathered all the flowers! The garden is beautiful!',
            summer: 'You made it to the beach! Enjoy the sunshine!',
            independence: 'You lit all the fireworks! Freedom rings!',
            fall: 'You finished the harvest! The crops are safe!'
        };
        return messages[this.currentHoliday];
    }
    
    // Defeat Messages for Run Game
    getRunDefeatMessage() {
        const messages = {
            halloween: 'The zombie caught you!',
            thanksgiving: 'The turkey caught you!',
            christmas: 'Santa caught you being naughty!',
            newyear: 'Time ran out before midnight!',
            valentines: 'Cupid\'s arrow got you!',
            stpatricks: 'The leprechaun caught you!',
            easter: 'The bunny caught up to you!',
            spring: 'The flowers wilted!',
            summer: 'The sun set on your adventure!',
            independence: 'The fireworks caught you!',
            fall: 'Winter arrived too soon!'
        };
        return messages[this.currentHoliday];
    }
    
    // Victory Messages for Jump Game
    getJumpVictoryMessage() {
        const messages = {
            halloween: 'The skeleton made it to safety! Great jumping!',
            thanksgiving: 'You jumped through the feast! Excellent hopping!',
            christmas: 'You hopped over all the gifts! Amazing jumps!',
            newyear: 'You leaped into the new year! Fantastic jumping!',
            valentines: 'You jumped through all the hearts! Love wins!',
            stpatricks: 'You bounced over the rainbows! Lucky jumps!',
            easter: 'You hopped like a true bunny! Egg-cellent!',
            spring: 'You jumped through the garden! Beautiful bouncing!',
            summer: 'You leaped over the waves! Awesome jumping!',
            independence: 'You jumped through the fireworks! Patriotic!',
            fall: 'You hopped through the harvest! Great jumping!'
        };
        return messages[this.currentHoliday];
    }
    
    // Defeat Messages for Jump Game
    getJumpDefeatMessage() {
        const messages = {
            halloween: 'You hit a jack-o\'-lantern!',
            thanksgiving: 'You crashed into a pie!',
            christmas: 'You bumped into a present!',
            newyear: 'You tripped over a champagne bottle!',
            valentines: 'You stumbled over a chocolate box!',
            stpatricks: 'You hit a pot of gold!',
            easter: 'You cracked an egg!',
            spring: 'You trampled a flower!',
            summer: 'You knocked over a sandcastle!',
            independence: 'You hit a sparkler!',
            fall: 'You tripped over a pumpkin!'
        };
        return messages[this.currentHoliday];
    }
    
    // Color Themes for Each Holiday
    getColorTheme() {
        const themes = {
            halloween: {
                primary: '#ff6b35',      // Orange
                secondary: '#2d1b69',    // Deep Purple
                accent: '#f7931e',       // Bright Orange
                background: '#1a1a2e',   // Dark Blue-Black
                text: '#f7f7f7',         // Off White
                gradient1: '#2d1b69',    // Deep Purple
                gradient2: '#16213e',    // Navy
                gradient3: '#0f172a'     // Dark Navy
            },
            thanksgiving: {
                primary: '#d2691e',      // Saddle Brown
                secondary: '#8b4513',    // Brown
                accent: '#ff8c00',       // Dark Orange
                background: '#2c1810',   // Dark Brown
                text: '#ffd700',         // Gold
                gradient1: '#8b4513',    // Brown
                gradient2: '#654321',    // Dark Brown
                gradient3: '#3d2817'     // Darker Brown
            },
            christmas: {
                primary: '#c41e3a',      // Christmas Red
                secondary: '#0f5132',    // Christmas Green
                accent: '#ffd700',       // Gold
                background: '#0a3d2c',   // Dark Green
                text: '#ffffff',         // White
                gradient1: '#0f5132',    // Dark Green
                gradient2: '#1a5c42',    // Medium Green
                gradient3: '#0a3d2c'     // Darker Green
            },
            newyear: {
                primary: '#ffd700',      // Gold
                secondary: '#000080',    // Navy Blue
                accent: '#ff69b4',       // Hot Pink
                background: '#0a0a1a',   // Very Dark Blue
                text: '#ffffff',         // White
                gradient1: '#000080',    // Navy
                gradient2: '#1a1a3d',    // Dark Blue
                gradient3: '#0a0a1a'     // Darker Blue
            },
            valentines: {
                primary: '#ff1493',      // Deep Pink
                secondary: '#c71585',    // Medium Violet Red
                accent: '#ff69b4',       // Hot Pink
                background: '#2d1b3d',   // Dark Purple
                text: '#ffe4e1',         // Misty Rose
                gradient1: '#c71585',    // Violet Red
                gradient2: '#8b1874',    // Dark Violet Red
                gradient3: '#4a0e3d'     // Very Dark Purple
            },
            stpatricks: {
                primary: '#228b22',      // Forest Green
                secondary: '#006400',    // Dark Green
                accent: '#ffd700',       // Gold
                background: '#0d3d0d',   // Very Dark Green
                text: '#f0fff0',         // Honeydew
                gradient1: '#228b22',    // Forest Green
                gradient2: '#1a6b1a',    // Medium Green
                gradient3: '#0d3d0d'     // Dark Green
            },
            easter: {
                primary: '#ff69b4',      // Hot Pink
                secondary: '#87ceeb',    // Sky Blue
                accent: '#ffff00',       // Yellow
                background: '#e6f3ff',   // Light Blue
                text: '#333333',         // Dark Gray
                gradient1: '#87ceeb',    // Sky Blue
                gradient2: '#b0d4f1',    // Light Blue
                gradient3: '#d4e9ff'     // Very Light Blue
            },
            spring: {
                primary: '#ff69b4',      // Pink
                secondary: '#90ee90',    // Light Green
                accent: '#ffb6c1',       // Light Pink
                background: '#e8f5e9',   // Very Light Green
                text: '#2d5016',         // Dark Green
                gradient1: '#90ee90',    // Light Green
                gradient2: '#b4f0b4',    // Lighter Green
                gradient3: '#d4f5d4'     // Very Light Green
            },
            summer: {
                primary: '#ffa500',      // Orange
                secondary: '#00bfff',    // Deep Sky Blue
                accent: '#ffff00',       // Yellow
                background: '#87ceeb',   // Sky Blue
                text: '#ffffff',         // White
                gradient1: '#00bfff',    // Sky Blue
                gradient2: '#5fd3ff',    // Light Blue
                gradient3: '#87ceeb'     // Sky Blue
            },
            independence: {
                primary: '#b22234',      // Red
                secondary: '#3c3b6e',    // Blue
                accent: '#ffffff',       // White
                background: '#1a1a2e',   // Dark Blue
                text: '#ffffff',         // White
                gradient1: '#3c3b6e',    // Blue
                gradient2: '#2a2a4d',    // Dark Blue
                gradient3: '#1a1a2e'     // Darker Blue
            },
            fall: {
                primary: '#d2691e',      // Chocolate
                secondary: '#8b4513',    // Saddle Brown
                accent: '#ff8c00',       // Dark Orange
                background: '#2c1810',   // Dark Brown
                text: '#ffa500',         // Orange
                gradient1: '#8b4513',    // Brown
                gradient2: '#654321',    // Dark Brown
                gradient3: '#3d2817'     // Darker Brown
            }
        };
        return themes[this.currentHoliday];
    }
    
    // Apply color theme to document
    applyColorTheme() {
        const theme = this.getColorTheme();
        const root = document.documentElement;
        
        // Set CSS custom properties
        root.style.setProperty('--holiday-primary', theme.primary);
        root.style.setProperty('--holiday-secondary', theme.secondary);
        root.style.setProperty('--holiday-accent', theme.accent);
        root.style.setProperty('--holiday-background', theme.background);
        root.style.setProperty('--holiday-text', theme.text);
        root.style.setProperty('--holiday-gradient1', theme.gradient1);
        root.style.setProperty('--holiday-gradient2', theme.gradient2);
        root.style.setProperty('--holiday-gradient3', theme.gradient3);
    }
    
    // Taxes Game Form Content
    getTaxesFormSectionHeadings() {
        const headings = {
            halloween: {
                employee: '🧙‍♀️ Witch Information',
                employer: '🏚️ Magical Organization Information',
                earnings: '💰 Magical Earnings Information',
                additional: '🔮 Additional Magical Earnings',
                deductions: '✨ Magical Deductions and Credits',
                foreign: 'Foreign Account Information (FBAR)',
                amt: 'Alternative Minimum Tax (AMT)',
                depreciation: 'Depreciation and Asset Information',
                state: 'State Information'
            },
            thanksgiving: {
                employee: '🦃 Pilgrim Information',
                employer: '🏠 Harvest Organization Information',
                earnings: '🌾 Harvest Earnings Information',
                additional: '🥧 Additional Harvest Earnings',
                deductions: '🍁 Harvest Deductions and Credits',
                foreign: 'Foreign Account Information (FBAR)',
                amt: 'Alternative Minimum Tax (AMT)',
                depreciation: 'Depreciation and Asset Information',
                state: 'State Information'
            },
            christmas: {
                employee: '🎅 Elf Information',
                employer: '🏭 Workshop Organization Information',
                earnings: '🎁 Gift-Making Earnings Information',
                additional: '⛄ Additional Workshop Earnings',
                deductions: '🎄 Holiday Deductions and Credits',
                foreign: 'Foreign Account Information (FBAR)',
                amt: 'Alternative Minimum Tax (AMT)',
                depreciation: 'Depreciation and Asset Information',
                state: 'State Information'
            },
            newyear: {
                employee: '🎊 Celebrator Information',
                employer: '🎉 Party Organization Information',
                earnings: '🥂 Celebration Earnings Information',
                additional: '🎆 Additional Party Earnings',
                deductions: '✨ Celebration Deductions and Credits',
                foreign: 'Foreign Account Information (FBAR)',
                amt: 'Alternative Minimum Tax (AMT)',
                depreciation: 'Depreciation and Asset Information',
                state: 'State Information'
            },
            valentines: {
                employee: '💝 Cupid Information',
                employer: '💕 Love Organization Information',
                earnings: '💖 Romance Earnings Information',
                additional: '💐 Additional Love Earnings',
                deductions: '💘 Romantic Deductions and Credits',
                foreign: 'Foreign Account Information (FBAR)',
                amt: 'Alternative Minimum Tax (AMT)',
                depreciation: 'Depreciation and Asset Information',
                state: 'State Information'
            },
            stpatricks: {
                employee: '🍀 Leprechaun Information',
                employer: '🌈 Lucky Organization Information',
                earnings: '🪙 Golden Earnings Information',
                additional: '☘️ Additional Lucky Earnings',
                deductions: '💚 Irish Deductions and Credits',
                foreign: 'Foreign Account Information (FBAR)',
                amt: 'Alternative Minimum Tax (AMT)',
                depreciation: 'Depreciation and Asset Information',
                state: 'State Information'
            },
            easter: {
                employee: '🐰 Bunny Information',
                employer: '🥚 Egg Hunt Organization Information',
                earnings: '🌷 Spring Earnings Information',
                additional: '🐣 Additional Easter Earnings',
                deductions: '🌸 Spring Deductions and Credits',
                foreign: 'Foreign Account Information (FBAR)',
                amt: 'Alternative Minimum Tax (AMT)',
                depreciation: 'Depreciation and Asset Information',
                state: 'State Information'
            },
            spring: {
                employee: '🌸 Gardener Information',
                employer: '🌼 Garden Organization Information',
                earnings: '🌺 Floral Earnings Information',
                additional: '🦋 Additional Garden Earnings',
                deductions: '🌻 Nature Deductions and Credits',
                foreign: 'Foreign Account Information (FBAR)',
                amt: 'Alternative Minimum Tax (AMT)',
                depreciation: 'Depreciation and Asset Information',
                state: 'State Information'
            },
            summer: {
                employee: '☀️ Beachgoer Information',
                employer: '🏖️ Summer Organization Information',
                earnings: '🌊 Vacation Earnings Information',
                additional: '🍉 Additional Summer Earnings',
                deductions: '🏄 Beach Deductions and Credits',
                foreign: 'Foreign Account Information (FBAR)',
                amt: 'Alternative Minimum Tax (AMT)',
                depreciation: 'Depreciation and Asset Information',
                state: 'State Information'
            },
            independence: {
                employee: '🇺🇸 Patriot Information',
                employer: '🎆 Freedom Organization Information',
                earnings: '⭐ Liberty Earnings Information',
                additional: '🎇 Additional Patriotic Earnings',
                deductions: '🦅 American Deductions and Credits',
                foreign: 'Foreign Account Information (FBAR)',
                amt: 'Alternative Minimum Tax (AMT)',
                depreciation: 'Depreciation and Asset Information',
                state: 'State Information'
            },
            fall: {
                employee: '🍂 Harvester Information',
                employer: '🎃 Autumn Organization Information',
                earnings: '🌰 Seasonal Earnings Information',
                additional: '🍁 Additional Autumn Earnings',
                deductions: '🌾 Harvest Deductions and Credits',
                foreign: 'Foreign Account Information (FBAR)',
                amt: 'Alternative Minimum Tax (AMT)',
                depreciation: 'Depreciation and Asset Information',
                state: 'State Information'
            }
        };
        return headings[this.currentHoliday];
    }
    
    getTaxesFormEditableWords() {
        const words = {
            halloween: {
                person: 'Witch\'s',
                personNoApostrophe: 'Witch',
                place: 'Coven\'s',
                placeNoApostrophe: 'Coven',
                adjective: 'Magical',
                license: 'Witch\'s license',
                organization: 'Magical organization',
                activity1: 'Spell',
                activity2: 'Potion',
                item1: 'Curse',
                item2: 'Crystal',
                item3: 'Enchanted',
                item4: 'Familiar',
                location: 'Haunted',
                donation: 'Charitable spell',
                tool: 'Cauldron',
                skill: 'Spellcasting'
            },
            thanksgiving: {
                person: 'Pilgrim\'s',
                personNoApostrophe: 'Pilgrim',
                place: 'Family\'s',
                placeNoApostrophe: 'Family',
                adjective: 'Harvest',
                license: 'Pilgrim\'s license',
                organization: 'Harvest organization',
                activity1: 'Farming',
                activity2: 'Cooking',
                item1: 'Blessing',
                item2: 'Gratitude',
                item3: 'Feast',
                item4: 'Turkey',
                location: 'Cozy',
                donation: 'Charitable food',
                tool: 'Kitchen',
                skill: 'Farming'
            },
            christmas: {
                person: 'Elf\'s',
                personNoApostrophe: 'Elf',
                place: 'Workshop\'s',
                placeNoApostrophe: 'Workshop',
                adjective: 'Festive',
                license: 'Elf\'s license',
                organization: 'Festive organization',
                activity1: 'Gift',
                activity2: 'Toy',
                item1: 'Present',
                item2: 'Ornament',
                item3: 'Wrapped',
                item4: 'Reindeer',
                location: 'Jolly',
                donation: 'Charitable gift',
                tool: 'Sleigh',
                skill: 'Toy-making'
            },
            newyear: {
                person: 'Celebrator\'s',
                personNoApostrophe: 'Celebrator',
                place: 'Party\'s',
                placeNoApostrophe: 'Party',
                adjective: 'Festive',
                license: 'Celebrator\'s license',
                organization: 'Festive organization',
                activity1: 'Resolution',
                activity2: 'Toast',
                item1: 'Countdown',
                item2: 'Champagne',
                item3: 'Sparkly',
                item4: 'Confetti',
                location: 'Exciting',
                donation: 'Charitable celebration',
                tool: 'Party horn',
                skill: 'Celebrating'
            },
            valentines: {
                person: 'Cupid\'s',
                personNoApostrophe: 'Cupid',
                place: 'Heart\'s',
                placeNoApostrophe: 'Heart',
                adjective: 'Romantic',
                license: 'Cupid\'s license',
                organization: 'Romantic organization',
                activity1: 'Love',
                activity2: 'Romance',
                item1: 'Kiss',
                item2: 'Rose',
                item3: 'Lovely',
                item4: 'Chocolate',
                location: 'Lovely',
                donation: 'Charitable love',
                tool: 'Arrow',
                skill: 'Matchmaking'
            },
            stpatricks: {
                person: 'Leprechaun\'s',
                personNoApostrophe: 'Leprechaun',
                place: 'Rainbow\'s',
                placeNoApostrophe: 'Rainbow',
                adjective: 'Lucky',
                license: 'Leprechaun\'s license',
                organization: 'Lucky organization',
                activity1: 'Gold',
                activity2: 'Luck',
                item1: 'Blessing',
                item2: 'Shamrock',
                item3: 'Lucky',
                item4: 'Clover',
                location: 'Lucky',
                donation: 'Charitable gold',
                tool: 'Pot',
                skill: 'Gold-finding'
            },
            easter: {
                person: 'Bunny\'s',
                personNoApostrophe: 'Bunny',
                place: 'Garden\'s',
                placeNoApostrophe: 'Garden',
                adjective: 'Spring',
                license: 'Bunny\'s license',
                organization: 'Spring organization',
                activity1: 'Egg',
                activity2: 'Basket',
                item1: 'Hunt',
                item2: 'Jellybean',
                item3: 'Colorful',
                item4: 'Chick',
                location: 'Blooming',
                donation: 'Charitable basket',
                tool: 'Basket',
                skill: 'Egg-hiding'
            },
            spring: {
                person: 'Gardener\'s',
                personNoApostrophe: 'Gardener',
                place: 'Garden\'s',
                placeNoApostrophe: 'Garden',
                adjective: 'Floral',
                license: 'Gardener\'s license',
                organization: 'Floral organization',
                activity1: 'Planting',
                activity2: 'Watering',
                item1: 'Seed',
                item2: 'Flower',
                item3: 'Blooming',
                item4: 'Butterfly',
                location: 'Beautiful',
                donation: 'Charitable planting',
                tool: 'Watering can',
                skill: 'Gardening'
            },
            summer: {
                person: 'Vacationer\'s',
                personNoApostrophe: 'Vacationer',
                place: 'Beach\'s',
                placeNoApostrophe: 'Beach',
                adjective: 'Sunny',
                license: 'Vacationer\'s license',
                organization: 'Sunny organization',
                activity1: 'Swimming',
                activity2: 'Surfing',
                item1: 'Wave',
                item2: 'Sunscreen',
                item3: 'Beachy',
                item4: 'Seashell',
                location: 'Sandy',
                donation: 'Charitable beach',
                tool: 'Surfboard',
                skill: 'Swimming'
            },
            independence: {
                person: 'Patriot\'s',
                personNoApostrophe: 'Patriot',
                place: 'Nation\'s',
                placeNoApostrophe: 'Nation',
                adjective: 'Patriotic',
                license: 'Patriot\'s license',
                organization: 'Patriotic organization',
                activity1: 'Freedom',
                activity2: 'Liberty',
                item1: 'Firework',
                item2: 'Flag',
                item3: 'Star-spangled',
                item4: 'Eagle',
                location: 'Proud',
                donation: 'Charitable patriotic',
                tool: 'Flag',
                skill: 'Freedom-celebrating'
            },
            fall: {
                person: 'Harvester\'s',
                personNoApostrophe: 'Harvester',
                place: 'Farm\'s',
                placeNoApostrophe: 'Farm',
                adjective: 'Autumn',
                license: 'Harvester\'s license',
                organization: 'Autumn organization',
                activity1: 'Harvest',
                activity2: 'Cider',
                item1: 'Crop',
                item2: 'Apple',
                item3: 'Golden',
                item4: 'Squash',
                location: 'Rustic',
                donation: 'Charitable harvest',
                tool: 'Basket',
                skill: 'Harvesting'
            }
        };
        return words[this.currentHoliday];
    }
    
    getTaxesFormDefaultValues() {
        const values = {
            halloween: {
                employeeName: 'Morticia Spellweaver',
                employeeAddress: '13 Haunted Hollow Lane',
                employeeCity: 'Spooktown, MA 13131',
                employerName: 'The Midnight Spell Society',
                employerAddress: '666 Witches Circle',
                employerCity: 'Salem, MA 01970'
            },
            thanksgiving: {
                employeeName: 'William Harvest',
                employeeAddress: '1621 Pilgrim Path',
                employeeCity: 'Plymouth, MA 02360',
                employerName: 'The Grateful Gathering Co.',
                employerAddress: '400 Mayflower Lane',
                employerCity: 'Plymouth, MA 02360'
            },
            christmas: {
                employeeName: 'Jingle McWorkshop',
                employeeAddress: '1 North Pole Way',
                employeeCity: 'North Pole, AK 99705',
                employerName: 'Santa\'s Workshop Inc.',
                employerAddress: '2 Candy Cane Lane',
                employerCity: 'North Pole, AK 99705'
            },
            newyear: {
                employeeName: 'Nova Celebration',
                employeeAddress: '2024 Times Square',
                employeeCity: 'New York, NY 10036',
                employerName: 'Midnight Party Planners',
                employerAddress: '1 Ball Drop Plaza',
                employerCity: 'New York, NY 10036'
            },
            valentines: {
                employeeName: 'Cupid Heartstring',
                employeeAddress: '14 Romance Road',
                employeeCity: 'Loveland, CO 80537',
                employerName: 'Arrow of Love Services',
                employerAddress: '143 Valentine Avenue',
                employerCity: 'Loveland, CO 80537'
            },
            stpatricks: {
                employeeName: 'Patrick O\'Lucky',
                employeeAddress: '17 Rainbow Road',
                employeeCity: 'Dublin, Ireland',
                employerName: 'Pot O\' Gold Industries',
                employerAddress: '4 Clover Court',
                employerCity: 'Dublin, Ireland'
            },
            easter: {
                employeeName: 'Bunny Hopsworth',
                employeeAddress: '1 Easter Lane',
                employeeCity: 'Spring Valley, NY 10977',
                employerName: 'The Great Egg Hunt Co.',
                employerAddress: '12 Basket Boulevard',
                employerCity: 'Spring Valley, NY 10977'
            },
            spring: {
                employeeName: 'Flora Bloomington',
                employeeAddress: '21 Blossom Street',
                employeeCity: 'Garden Grove, CA 92840',
                employerName: 'Petal Perfect Gardens',
                employerAddress: '100 Flower Field Drive',
                employerCity: 'Garden Grove, CA 92840'
            },
            summer: {
                employeeName: 'Sunny Beachside',
                employeeAddress: '777 Ocean Drive',
                employeeCity: 'Miami Beach, FL 33139',
                employerName: 'Surf & Sun Resort',
                employerAddress: '88 Paradise Avenue',
                employerCity: 'Miami Beach, FL 33139'
            },
            independence: {
                employeeName: 'Liberty Patriot',
                employeeAddress: '1776 Freedom Way',
                employeeCity: 'Philadelphia, PA 19106',
                employerName: 'Stars & Stripes Foundation',
                employerAddress: '13 Colony Court',
                employerCity: 'Philadelphia, PA 19106'
            },
            fall: {
                employeeName: 'Autumn Goldleaf',
                employeeAddress: '9 Harvest Hill',
                employeeCity: 'Maple Grove, MN 55311',
                employerName: 'Golden Acres Farm',
                employerAddress: '55 Pumpkin Patch Lane',
                employerCity: 'Maple Grove, MN 55311'
            }
        };
        return values[this.currentHoliday];
    }
    
    getTaxesFormCurrency() {
        const currencies = {
            halloween: 'gold coins',
            thanksgiving: 'corn kernels',
            christmas: 'candy canes',
            newyear: 'party tokens',
            valentines: 'love notes',
            stpatricks: 'gold coins',
            easter: 'chocolate eggs',
            spring: 'flower petals',
            summer: 'seashells',
            independence: 'freedom bucks',
            fall: 'acorns'
        };
        return currencies[this.currentHoliday];
    }
    
    getTaxesGameOverLabels() {
        const labels = {
            halloween: {
                completed: 'Spells Documented',
                time: 'Ritual Time',
                difficulty: 'Magical Difficulty',
                accuracy: 'Enchantment Accuracy',
                restart: 'Cast Again',
                changeDifficulty: 'Change Magic Level',
                returnHome: 'Return to Coven'
            },
            thanksgiving: {
                completed: 'Blessings Counted',
                time: 'Feast Time',
                difficulty: 'Harvest Difficulty',
                accuracy: 'Gratitude Accuracy',
                restart: 'Feast Again',
                changeDifficulty: 'Change Feast Size',
                returnHome: 'Return to Gathering'
            },
            christmas: {
                completed: 'Gifts Wrapped',
                time: 'Workshop Time',
                difficulty: 'Elf Difficulty',
                accuracy: 'Wrapping Accuracy',
                restart: 'Wrap Again',
                changeDifficulty: 'Change Workshop Speed',
                returnHome: 'Return to North Pole'
            },
            newyear: {
                completed: 'Resolutions Made',
                time: 'Party Time',
                difficulty: 'Celebration Difficulty',
                accuracy: 'Resolution Accuracy',
                restart: 'Celebrate Again',
                changeDifficulty: 'Change Party Size',
                returnHome: 'Return to Celebration'
            },
            valentines: {
                completed: 'Hearts Connected',
                time: 'Love Time',
                difficulty: 'Romance Difficulty',
                accuracy: 'Cupid Accuracy',
                restart: 'Spread Love Again',
                changeDifficulty: 'Change Love Level',
                returnHome: 'Return to Heart Haven'
            },
            stpatricks: {
                completed: 'Coins Collected',
                time: 'Lucky Time',
                difficulty: 'Leprechaun Difficulty',
                accuracy: 'Gold Finding Accuracy',
                restart: 'Search Again',
                changeDifficulty: 'Change Luck Level',
                returnHome: 'Return to Rainbow'
            },
            easter: {
                completed: 'Eggs Hidden',
                time: 'Hunt Time',
                difficulty: 'Bunny Difficulty',
                accuracy: 'Hiding Accuracy',
                restart: 'Hide Again',
                changeDifficulty: 'Change Hunt Size',
                returnHome: 'Return to Garden'
            },
            spring: {
                completed: 'Flowers Planted',
                time: 'Garden Time',
                difficulty: 'Gardening Difficulty',
                accuracy: 'Planting Accuracy',
                restart: 'Plant Again',
                changeDifficulty: 'Change Garden Size',
                returnHome: 'Return to Garden'
            },
            summer: {
                completed: 'Waves Surfed',
                time: 'Beach Time',
                difficulty: 'Vacation Difficulty',
                accuracy: 'Surfing Accuracy',
                restart: 'Surf Again',
                changeDifficulty: 'Change Wave Size',
                returnHome: 'Return to Beach'
            },
            independence: {
                completed: 'Fireworks Launched',
                time: 'Freedom Time',
                difficulty: 'Patriotic Difficulty',
                accuracy: 'Launch Accuracy',
                restart: 'Launch Again',
                changeDifficulty: 'Change Display Size',
                returnHome: 'Return to Liberty'
            },
            fall: {
                completed: 'Crops Harvested',
                time: 'Harvest Time',
                difficulty: 'Farm Difficulty',
                accuracy: 'Harvesting Accuracy',
                restart: 'Harvest Again',
                changeDifficulty: 'Change Farm Size',
                returnHome: 'Return to Farm'
            }
        };
        return labels[this.currentHoliday];
    }
}

// Create a global instance
const holidayResources = new HolidayResources();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HolidayResources;
}
