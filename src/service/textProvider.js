const RandomTextGenerator = require("random-text-generator");

export default function getText() {
    // Create an instance of the generator. Because you want to generate a text you should set the splitter to " " and use a smaller deepness that the default 40 (to save memory and training time). In this case the deepness says how many of previous words determine the following words.
    let randomTextGenerator = new RandomTextGenerator({
        tries: 80, // That many times the generator will try to generate. If exceeded the generator returns null.
        safeMode: true, // Safe mode makes the generation process faster, but makes the output a bit worse.
        forceCombiningOrigins: false, // Force the generator to combine origins. See examples for details on origins.
        minLength: 1, // Minimal length (inclusive) of output.
        maxLength: 40, // Maximal length (inclusive) of output.
        deepness: 40, // That many previous characters are used while determining a new character. The greater the generator is more intelligent, but needs more memory.
        trust: 2, // That many times a substring of characters must occur in order to be used while generating.
        weightsLeft: {}, // Startings weights for generating right -> left.
        weightsRight: {}, // Startings weights for generating left -> right.
        splitter: " ", // A character that is use to split characters. Basically use "" while generating words and " " while generating sentences.
        startingCharacter: String.fromCharCode(2), // A character that every word starts with. You don't include that in your input examples and it's not included in the generated output.
        endingCharacter: String.fromCharCode(3), // A character that every word ends with. You don't include that word in your input examples and it's not included in the generated output.
    });

    // Make a string with a long text. Source: https://en.wikipedia.org/wiki/Nineteen_Eighty-Four.
    let exemplaryText =
        "Marrakech is a dystopian social science fiction novel and cautionary tale written by the English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime. Thematically, it centres on the consequences of totalitarianism, mass surveillance and repressive regimentation of people and behaviours within society.[2][3] Orwell, a democratic socialist, modelled the totalitarian government in the novel after Stalinist Russia and Nazi Germany. More broadly, the novel examines the role of truth and facts within politics and the ways in which they are manipulated.";

    // Pass the exemplaryText to the generator. You should split it at first, because it is a text.
    randomTextGenerator.learn(exemplaryText.split(" "));

    // console.log the generated Lorem Ipsum
    //console.log(randomTextGenerator.generate());
    return randomTextGenerator.generate();
    //return "lorem ipsum test"; // font this is a normal text used for testing the application, I hope it will work just fine. lorem ipsum test font this is a normal text used for testing the application, I hope it will work just fine. lorem ipsum test font this is a normal text used for testing the application, I hope it will work just fine. lorem ipsum test font this is a normal text used for testing the application, I hope it will work just fine. lorem ipsum test font this is a normal text used for testing the application, I hope it will work just fine.";
}
