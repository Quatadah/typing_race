const RandomTextGenerator = require("random-text-generator");

export default function getText() {
    // Create an instance of the generator. Because you want to generate a text you should set the splitter to " " and use a smaller deepness that the default 40 (to save memory and training time). In this case the deepness says how many of previous words determine the following words.
    let randomTextGenerator = new RandomTextGenerator({
        splitter: " ",
        minLength: 20,
        maxLength: 40,
        deepness: 9,
    });

    // Make a string with a long text. Source: https://en.wikipedia.org/wiki/Nineteen_Eighty-Four.
    let exemplaryText =
        "Nineteen Eighty-Four is a dystopian social science fiction novel and cautionary tale written by the English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime. Thematically, it centres on the consequences of totalitarianism, mass surveillance and repressive regimentation of people and behaviours within society.[2][3] Orwell, a democratic socialist, modelled the totalitarian government in the novel after Stalinist Russia and Nazi Germany. More broadly, the novel examines the role of truth and facts within politics and the ways in which they are manipulated.";

    // Pass the exemplaryText to the generator. You should split it at first, because it is a text.
    randomTextGenerator.learn(exemplaryText.split(" "));

    // console.log the generated Lorem Ipsum
    //console.log(randomTextGenerator.generate());
    return randomTextGenerator.generate();
    //return "lorem ipsum test"; // font this is a normal text used for testing the application, I hope it will work just fine. lorem ipsum test font this is a normal text used for testing the application, I hope it will work just fine. lorem ipsum test font this is a normal text used for testing the application, I hope it will work just fine. lorem ipsum test font this is a normal text used for testing the application, I hope it will work just fine. lorem ipsum test font this is a normal text used for testing the application, I hope it will work just fine.";
}
