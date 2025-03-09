const words = 'apple, astronaut, balloon, battery, beach, bicycle, book, bridge, cactus, camera, castle, ceiling, chair, chimney, chocolate, cloud, coconut, computer, crocodile, curtain, desert, diamond, dictionary, dinosaur, door, dragon, elephant, elevator, engine, escalator, factory, feather, fence, festival, fireplace, flag, flashlight, fountain, fridge, frog, galaxy, garden, gate, giraffe, glacier, globe, gorilla, hammock, helicopter, hill, honey, hurricane, iceberg, igloo, island, jungle, kettle, key, kitchen, ladder, lake, lantern, laptop, lizard, lighthouse, magnet, mango, map, meadow, microwave, mirror, monkey, mountain, museum, mushroom, necklace, newspaper, night, notebook, ocean, octopus, orchestra, palace, panda, parachute, passport, peacock, pencil, penguin, pillow, planet, playground, pocket, polar bear, pond, poppy, post office, pumpkin, pyramid, radio, rainbow, river, rocket, rollercoaster, rose, sailboat, satellite, scarecrow, scarf, school, sculpture, seagull, shadow, ship, skyscraper, snowflake, sofa, solar system, spaceship, spider, squirrel, stadium, staircase, submarine, suitcase, sunflower, supermarket, surfboard, swing, telescope, tiger, tornado, train, treasure, tunnel, umbrella, valley, violin, volcano, wardrobe, waterfall, windmill, xylophone, zebra, accept, admire, announce, appreciate, arrange, arrive, bake, balance, behave, bounce, calculate, celebrate, challenge, chase, choose, clap, climb, collect, communicate, compare, compose, construct, convince, cooperate, decorate, deliver, discover, discuss, distribute, dive, encourage, entertain, escape, examine, explore, express, gather, generate, giggle, glide, harvest, hesitate, identify, imagine, improve, increase, investigate, juggle, jump, kick, kneel, knit, launch, leap, measure, meditate, memorize, motivate, navigate, observe, organize, paint, participate, perform, persuade, plant, polish, practice, predict, pretend, process, propose, protect, publish, purchase, race, recommend, recycle, relax, rely, repair, replace, represent, rescue, respond, rotate, sculpt, select, share, sketch, solve, stare, stretch, summarize, surf, swim, swing, translate, travel, unpack, vanish, volunteer, wander, whistle, witness, wonder, zoom, abundant, adventurous, affectionate, agile, ancient, amusing, astonishing, balanced, brave, brilliant, bubbly, careful, charming, cheerful, chilly, clever, clumsy, colorful, creative, curious, dazzling, delicate, determined, dynamic, eager, elegant, energetic, enormous, enthusiastic, excited, exotic, extravagant, fascinating, fearless, flexible, fortunate, fragile, fresh, friendly, funny, generous, gentle, gigantic, graceful, grateful, harmonious, helpful, hilarious, humble, imaginative, impressive, independent, ingenious, innocent, intelligent, intriguing, joyful, jubilant, keen, knowledgeable, lively, lucky, luxurious, magnificent, mysterious, noble, optimistic, outstanding, peaceful, peculiar, playful, pleasant, polite, powerful, precious, quick, radiant, rare, refreshing, remarkable, resourceful, respectful, robust, serene, sharp, shy, sincere, skillful, splendid, strong, stunning, sturdy, surprising, swift, talented, thoughtful, tidy, unique, vibrant, vigilant, whimsical, wise, witty, wondrous, youthful, zealous'.split(', ')

const wordsCount = words.length;
const wordsGenerated = 200;

function addClass(el, name) {
    el.className += ' ' + name;
}

function removeClass(el, name) {
    el.className = el.className.replace(name, '');
}

function randWord() {
    const randomIndex = Math.ceil(Math.random() * wordsCount);
    return words[randomIndex - 1];
}

function formatWord(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function restart() {
    document.getElementById('words').innerHTML = '';
    for(let i = 0; i < wordsGenerated; i++) {
        document.getElementById('words').innerHTML += formatWord(randWord());
    }
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');
    const cursor = document.getElementById('cursor')
    cursor.style.top = 191 + 'px';
    cursor.style.left = 80 + 'px';
}

document.getElementById('game').addEventListener('keydown', ev => {
    const key = ev.key;
    const currentLetter = document.querySelector('.letter.current');
    const currentWord = document.querySelector('.word.current');
    const expected = currentLetter?.innerHTML || '  ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackspace = key === 'Backpace';

    if (isLetter) {
        if (currentLetter) {
            addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
            removeClass(currentLetter, 'current');
            if (currentLetter.nextSibling) {
                addClass(currentLetter.nextSibling, 'current');
            } 
        } else {
            const incorrectLetter = document.createElement('span');
            incorrectLetter.innerHTML = key;
            incorrectLetter.className = 'letter incorrect extra';
            currentWord.appendChild(incorrectLetter);
        }
    }

    if (isSpace) {
        if(expected !== ' ') {
            const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            lettersToInvalidate.forEach(letter => {
                addClass(letter, 'incorrect')
                
            })
        }
        removeClass(currentWord, 'current');
        addClass(currentWord.nextSibling, 'current');
        if(currentLetter) {
            removeClass(currentLetter, 'current')
        }
        addClass(currentWord.nextSibling.firstChild, 'current')
    }
    if (isBackspace) {
        if (currentLetter && is)
    }

    // move cursor
    const nextLetter = document.querySelector('.letter.current');
    const nextWord = document.querySelector('.word.current');
    const cursor = document.getElementById('cursor')
    
    if (nextLetter) {
        cursor.style.top = nextLetter.getBoundingClientRect().top + 2 + 'px';
        cursor.style.left = nextLetter.getBoundingClientRect().left + 'px';
        
    } else {
        cursor.style.top = nextWord.getBoundingClientRect().top + 10 + 'px';
        cursor.style.left = nextWord.getBoundingClientRect().right + 'px';
    }
})

restart();