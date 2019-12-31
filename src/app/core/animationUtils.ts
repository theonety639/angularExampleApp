/*
******************************************************************************************************************
This is a way of getting the styles that are already applied to some css selectors or bootstrap classes and make transitions between them.
******************************************************************************************************************
*/

export function getStylesFromClasses(names: string | string[],
    elementType: string = "div"): { [key: string]: string | number } {
    let elem = document.createElement(elementType);
    (typeof names == "string" ? [names] : names).forEach(c => elem.classList.add(c));
    let result = {};
    for (let i = 0; i < document.styleSheets.length; i++) {
        let sheet = document.styleSheets[i] as CSSStyleSheet;
        let rules = sheet.rules || sheet.cssRules;
        for (let j = 0; j < rules.length; j++) {
            if (rules[j].type == CSSRule.STYLE_RULE) {
                let styleRule = rules[j] as CSSStyleRule;
                if (elem.matches(styleRule.selectorText)) {
                    for (let k = 0; k < styleRule.style.length; k++) {
                        result[styleRule.style[k]] =
                            styleRule.style[styleRule.style[k]];
                    }
                }
            }
        }
    }
    return result;
}