import React from 'react'

const About = () => {
    return (
        <div className='about-parent'>
            <div className="about bg-light">
                <h2>HOW TO PLAY</h2>
                <p className="lead">
                    The objective of the game is to write HTML/CSS to replicate the given target image in the least code possible.

                    In the target page, start coding in the editor area on the left. As you start typing, the output area in the middle will start rendering your code. When you're confident that the output matches the target image, hit the Submit button to see your score.

                    Important points to Note:
                    It is recommended to play on Chromium based browsers (Chrome/Safari) because that is what is used for scoring at the backend. Other browser may have some differences in how they render a particular code.
                    What you write in the editor, renders as it is. We make no change. This means you don't even get the DOCTYPE
                    Since this is "CSS" battle, you are not allowed to use JavaScript or images in your code. In fact any external asset is not allowed. All code required to generate the target image has to be written in the given editor only.
                    Now go and climb the leaderboards!
                </p>
            </div>
            <div className="about mt-2 bg-light">
                <h2>TIPS AND TRICKS</h2>
                <p className="lead mt-2">
                    <h5>1. White-space removal</h5>
                    The most basic strategy for code-golfing — remove unnecessary spaces, tabs, newlines, etc. These characters are not necessary for the code to work functionally. This is one of the things that minifiers do to your code too.
                </p>
                <p className="lead">
                    <h5>2. Omit the last semi-colon</h5>
                    Semi-colon for the last CSS declaration in a declaration block can be omitted.
                </p>
                <p className="lead">
                    <h5>3. Omit the closing tags</h5>
                    In most cases, you can omit the closing tag of an element. This works because the Browser closes them for you, to make the HTML valid. Though, be cautious as in some cases seemingly unclosed sibling tags can become parent-child of each other.
                </p>
                <p className="lead">
                    <h5>4. Omit the 'px' unit</h5>
                    For many properties, you can omit the px unit and just write the numeric value.
                </p>
            </div>
        </div>
    )
}

export default About
