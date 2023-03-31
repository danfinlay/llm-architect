- Right click any block in Roam
- Turn it into a presentation
- There is now a much better maintained [[Roam Research]] slideshow plugin called [Presentation](https://roamjs.com/extensions/presentation)
- Behavior
    - Shows the title as a standalone
    - For each node with children, shows a titled page where the children appear incrementally.
    - Designed for systematically and patiently stepping others through otherwise complex notes.
    - Ends with a "Questions?" slide.
- How it works
    - ![fill murray](https://www.fillmurray.com/200/250)
    - roam/js extension
    - {{[[roam/js]]}}
        - Using the [[roamAlphaAPI]]
        - `Present` button in the bottom left that calls `slideshow()`
            - ```javascript
const button = document.createElement('button');
button.innerText = 'Present';
button.style = 'position:absolute;bottom:0px;left:0px;z-index:999';
document.body.append(button);
button.addEventListener('click', (event) => {
  event.preventDefault();
  if (!slideshow) return;
  slideshow();
});```
        - `slideshow()`: Calls the various functions and creates the slideshow iframe.
            - ```javascript
window.slideshow = function slideshow (pageId) {
  if (!pageId) {
    pageId = getCurrentPageId();
  }
  
  const roamJson = getRoamJsonFor(pageId);
  const html = roamToSlideHtml(roamJson);
  const rendered = populateTemplate(template, html);

  function populateTemplate (template, slides) {
      return template.replace('INSERT_SLIDES_HERE', slides);
  }
  
  console.log('making a container');
  const container = document.createElement('div');
  container.style = `
    width:100%;
    height:100%;
    position:absolute;
    top: 0px;
    z-index: 99999;
`
  const frame = document.createElement('iframe');
  frame.srcdoc = rendered;
  frame.style = `
    width:100%;
    height:100%;
    position:absolute;
`
  const closeButton = document.createElement('button');
  closeButton.style = `
	position:absolute;
	right:0px;
`
  closeButton.innerText = 'X';
  closeButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    document.body.removeChild(container);
  });
  
  container.appendChild(frame);
  container.appendChild(closeButton);
  document.body.appendChild(container);
  console.log('container appended', container);
}
```j
        - The template HTML for the slideshow iframe
            - ```javascript
const template = `
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

		<title>reveal.js</title>

		<link rel="stylesheet" href="https://danfinlay.github.io/roam-to-slides/dist/reset.css">
		<link rel="stylesheet" href="https://danfinlay.github.io/roam-to-slides/dist/reveal.css">
		<link rel="stylesheet" href="https://danfinlay.github.io/roam-to-slides/dist/theme/metamask.css" id="theme">

		<!-- Theme used for syntax highlighted code -->
		<link rel="stylesheet" href="https://danfinlay.github.io/roam-to-slides/plugin/highlight/monokai.css" id="highlight-theme">
<style>
body{
background: white url("https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FMetaMask%2Fn2bM59kiuZ.png?alt=media&token=5ee7c366-9160-49b5-b7f8-bae763609dc6") no-repeat 95% 50%;
background-size:5%
}
</style>
</head>
	<body style='background-image:url("https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FMetaMask%2Fn2bM59kiuZ.png?alt=media&token=5ee7c366-9160-49b5-b7f8-bae763609dc6");
  background-repeat:no-repeat;background-size:5%'>
		<div class="reveal">
	      INSERT_SLIDES_HERE	
		</div>

		<script src="https://danfinlay.github.io/roam-to-slides/dist/reveal.js"></script>
		<script src="https://danfinlay.github.io/roam-to-slides/plugin/notes/notes.js"></script>
		<script src="https://danfinlay.github.io/roam-to-slides/plugin/markdown/markdown.js"></script>
		<script src="https://danfinlay.github.io/roam-to-slides/plugin/highlight/highlight.js"></script>
		<script>
			// More info about initialization & config:
			// - https://revealjs.com/initialization/
			// - https://revealjs.com/config/
			Reveal.initialize({
				hash: true,

				// Learn about plugins: https://revealjs.com/plugins/
				plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
			});
		</script>
	</body>
</html>

`;```
        - `roam-to-slides.js`
            - ```javascript
/**
 * interface Slide {
 *   title: string;
 *   path: string;
 *   children: string[];
 * }
 */

roamToSlideHtml = function (roamGraph) {
    let slides = [];
  console.log(roamGraph);
    addSlides(roamGraph, (item) => slides.push(item));
    const html = slidesToHtml(slides);
    return html;
}

function slideSort (a, b) {
  console.log(`Sorting ${a} from ${b}`)
  return a.order - b.order;
}
function addSlides (json, push, path = '') {
    if (!Array.isArray(json)) return;
  
    json.sort(slideSort).forEach((slide) => {
        if (!('title' in slide) && !('children' in slide)) return;

        if (('title' in slide) && slide.children.sort(slideSort)) {
            push({
                title: slide.title,
            });
        }

        push({
            path,
            title: slide.title || slide.string,
            children: slide?.children?.sort(slideSort).map(child => child.string)
        })

        let updatedPath = path;
        if (slide.string) {
           updatedPath += ` > ${slide.string}`;
        } else if (slide.title) {
            updatedPath += slide.title;
        }
        addSlides(slide.children, push, updatedPath);
    })
}

function slidesToHtml (slides) {
    let html = '<div class="slides">\n';
    slides.forEach((slide) => {
        html += slideToHtml(slide);
    });
    html += '<section>Questions?</section>\n'
    html += '</div>'
    return html;
}

function slideToHtml (slide) {
    if (typeof slide.title !== 'undefined' && !slide.children) {
        return `<section>${colorTags(slide.title)}</section>\n`
    }

    if (slide.title && slide.children) {
        return `<section>
            <p class="path">${colorTags(slide.path)}</p>
            <h2>${colorTags(slide.title)}</h2>
            <ul>
            ${slide.children && slide.children
                .map((child, i) => child && `<li class="fragment">${colorTags(child)}</li>`)
                .join('')} 
          </ul>
        </section>`
    }
}

// More like "render markdown"
function colorTags (text) {
    let output = text;
    while (output.indexOf('[[') !== -1 && output.indexOf(']]') !== -1) {
        output = output.replace('[[', '<a>');
        output = output.replace(']]', '</a>');
    }

    return output;
}

```l
        - Get current page ID
            - ```javascript
function getCurrentPageId () {
  const urlParts = document.location.href.split('/');
  const pageId = urlParts[urlParts.length - 1];
  return pageId;
}```
        - Get JSON for page ID
            - ```javascript
function getRoamJsonFor (pageId) {
  const pageArr = window.roamAlphaAPI.q(`[
    :find (pull ?e [
        :node/title 
        :block/string 
        :block/children
		:block/order
        {:block/children ...}
    ])  
    :where [?e :block/uid "${pageId}"]]
 `);
  const roamJson = pageArr[0];
  console.dir(roamJson);
  return roamJson;
}```
        - [A feature request that could allow this as a context menu action instead of a hacky bottom left button](https://forum.roamresearch.com/t/a-native-way-to-a-add-options-to-context-menu-in-roam-js/3498/2)
            - ```javascript
/**
window
 .roamAlphaAPI
 .addContextMenuOption({
  "optionName": "Present Slideshow",
  "callback": ({location, block}) => {
     window.slideshow();
     console.log('Presenting slideshow!!!');
  }
});
**/```
- Feature requests
    - Properly render blocks including images and links (maybe using [[roam-marked]])
- Old/early version [On GitHub](https://github.com/danfinlay/roam-to-slides)
