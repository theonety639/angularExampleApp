import { trigger, style, state, transition, animate } from "@angular/animations";

export const HighlightTrigger = trigger("rowHighlight", [
    state("selected", style({
        backgroundColor: "lightgreen"
    })),
    state("notselected", style({
        backgroundColor: "lightsalmon"
    })),
    state("*", style({
        border: "solid black 2px"
    })),
    /*This doesn't work.  It's on the book on page 731.
    state("void", style({
        opacity: "50%"
    })),*/

    transition("selected => notselected", animate("0.2s ease-out")),
    transition("notselected => selected", animate("0.4s ease-in"))

    /*It's also possible to chain some styles together, like this, but the animation will only happen for the background color, which will go from lightsalmon to lightgreen.  The fontSize and border will happen instantaneously at the end of the 0.4s.  There's another block here that shows how to create a bunch of animations that animate one AFTER another.  To make animations that happen all at once, add more style to the uncommented blocks above.
    transition("notselected => selected", animate("0.4s ease-in",
    style({
        fontSize: "25px",
        border: 5 solid green})))*/

    /*This is one way to chain animations, so one happens after another.  This is what'll happen: when the animation property goes from unselected to selected, it'll go from lightsalmon to lightblue and fontSize 25px in 400ms with a delay of 200ms, then it'll go to lightcoral and fontSize 30px in 250ms, then it'll go to lightgreen and normal fontSize in 200ms.
    transition("notselected => selected",
        [
            animate("400ms 200ms ease-in",
                style({
                    backgroundColor: "lightblue",
                    fontSize: "25px"
                })),
            animate("250ms", style({
                backgroundColor: "lightcoral",
                fontSize: "30px"
                })),
            animate("200ms")
        ]
    )

    Besides making animations in sequence, like shown above, there's another way of making animations happen all at once, besides the first shown on this file.  The first way of making animations happen all at once has the drawback they all have to happen with the same duration.  If I wanna make animations, happening all at once, each with its own duration, and "easing" functions (ease, easey-in, ease-out...), I have to use group, like shown below.  It'll go from lightsalmon to lightblue and fontSize 25px at the same time in 400ms with a delay of 200ms, then after that, at the same time it'll go to lightcoral in 250ms and to fontSize 30px in 450ms, then after that, it'll go to lightgreen in 200ms.
    transition("unselected => selected",
        [
            animate("400ms 200ms ease-in",
                style({
                    backgroundColor: "lightblue",
                    fontSize: "25px"
                })),
            group([
                animate("250ms", style({
                    backgroundColor: "lightcoral",
                })),
                animate("450ms", style({
                    fontSize: "30px"
                })),
            ]),
            animate("200ms")]
    )
    *******************************************************************************************************
    It's possible to create common styles and use them, besides the customized ones.  I'm putting this whole thing between these star lines because this block of text represents the whole file.
import { trigger, style, state, transition, animate, group } from "@angular/animations";

const commonStyles = {
                        border: "black solid 4px",
                        color: "white"
                     };

export const HighlightTrigger = trigger("rowHighlight",
                                    [
                                        state("selected", style(
                                            [
                                                commonStyles,
                                                {
                                                    backgroundColor: "lightgreen",
                                                    fontSize: "20px"
                                        }])),
                                        state("notselected", style(
                                            [
                                                commonStyles,
                                                {
                                                    backgroundColor: "lightsalmon",
                                                    fontSize: "12px",
                                                    color: "black"
                                        }])),
                                        state("void", style({
                                            opacity: 0
                                        })),
transition("selected => notselected", animate("200ms")),
transition("unselected => selected", animate("400ms 200ms ease-in")),
transition("void <=> notselected", animate("500ms"))
transition("void <=> selected", animate("500ms"))
]);
As usual, the book uses some asterisk to go from/to the other css selectors, like unselected, selected, void, but they didn't work before.  They killed any animation that was set up.
    *******************************************************************************************************
    */

/*This is a way to get styles that are applied to an css selectors or bootstrap classes and make transitions between the styles.
*************************************************************************************************************
import { trigger, style, state, transition, animate, group }
from "@angular/animations";
import { getStylesFromClasses } from "./animationUtils";
export const HighlightTrigger = trigger("rowHighlight", [
state("selected", style(getStylesFromClasses(["bg-success", "h2"]))),
state("notselected", style(getStylesFromClasses("bg-info"))),
state("void", style({
transform: "translateX(-50%)"
})),
transition("* => notselected", animate("200ms")),
transition("* => selected", animate("400ms 200ms ease-in")),
transition("void => *", animate("500ms"))
]);
**************************************************************************************************************
*/

    /*The second number in the animate function is the delay, before the animation from notselected to selected beings.  I don't know if it works.
transition("notselected => selected", animate("0.4s 0.5s ease-in")),*/

    /*This doesn't work.  It's on the book, page 730.
    transition("* => notselected", animate("200ms")),
    transition("* => selected", animate("400ms"))*/
]);