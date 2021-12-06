// @ts-nocheck
import { Streamlit, RenderData } from "streamlit-component-lib"
import * as d3 from "d3"
import { OrgChart } from "d3-org-chart"

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event: Event): void {
  // Streamlit.setComponentValue(newCount)

  const data = (event as CustomEvent<RenderData>).detail
  const dataFlattened = data.args.chart_data
  const chart = new OrgChart()
    .container(".chart-container")
    .data(dataFlattened)
    .svgHeight(window.innerHeight)
    .nodeWidth((d) => 384)
    .initialZoom(1)
    .nodeHeight((d) => 260)
    .childrenMargin((d) => 40)
    .compactMarginBetween((d) => 15)
    .compactMarginPair((d) => 80)
    .nodeContent(function (d, i, arr, state) {
      const contentArea = document.createElement("div")
      contentArea.style.height = `${d.height}px`
      contentArea.style.paddingTop = "60px"

      const card = document.createElement("div")
      card.style.display = "flex"
      card.style.flexDirection = "column"
      card.style.borderRadius = "2px"
      card.style.overflow = "visible"
      card.style.height = `${d.height - 60}px`
      card.style.border = "2px solid"
      card.style.alignItems = "center"

      contentArea.appendChild(card)

      const img = document.createElement(d.data.profileUrl ? "a" : "div")
      if (d.data.profileUrl) {
        img.href = d.data.profileUrl
        img.target = "_blank"
      }
      img.style.display = "flex"
      img.style.alignItems = "flex-end"
      img.style.justifyContent = "flex-end"
      img.style.backgroundImage = `url('${
        d.data.imageUrl || `https://picsum.photos/500/500?cache=${d.id}`
      }')`
      img.style.backgroundPositon = "center center"
      img.style.backgroundSize = "cover"
      img.style.backgroundRepeat = "no-repeat"
      img.style.marginTop = "-50px"
      img.style.width = "100px"
      img.style.height = "100px"
      img.style.textDecoration = "none"

      const emoji = document.createElement("div")
      emoji.style.width = "40px"
      emoji.style.height = "40px"
      emoji.style.display = "flex"
      emoji.style.justifyContent = "center"
      emoji.style.alignItems = "center"
      emoji.style.textAlign = "center"
      emoji.style.borderRadius = "10px"
      emoji.style.marginRight = "-10px"
      emoji.style.marginBottom = "-10px"
      emoji.style.backgroundColor = "var(--secondary-background-color)"

      const emojiText = document.createElement("div")
      emojiText.style.fontSize = "24px"
      emojiText.textContent = d.data.emoji || ""

      emoji.appendChild(emojiText)
      img.appendChild(emoji)

      card.appendChild(img)

      const name = document.createElement("div")
      name.style.fontSize = "24px"
      name.style.fontWeight = "bold"
      name.style.textAlign = "center"
      name.style.marginTop = "14px"
      name.textContent = d.data.primary || ""

      card.appendChild(name)

      const role = document.createElement("div")
      role.style.fontSize = "16px"
      role.style.textAlign = "center"
      role.style.marginTop = "2px"
      role.textContent = d.data.secondary || ""

      card.appendChild(role)

      const options = document.createElement("div")
      options.style.flexGrow = "1"
      options.style.marginBottom = "24px"
      options.style.display = "flex"

      const optionsText = document.createElement("div")
      optionsText.style.display = "inline-block"
      optionsText.style.alignSelf = "flex-end"
      optionsText.style.textAlign = "center"
      optionsText.style.fontSize = "14px"

      optionsText.textContent = d.data.tertiary || ""

      options.appendChild(optionsText)
      card.appendChild(options)

      return contentArea.outerHTML
    })
    .buttonContent(({ node, state }) => {
      const icon = {
        left: (d) => (d ? "‹" : "›"),
        bottom: (d) => (d ? "ˬ" : "ˆ"),
        right: (d) => (!d ? "‹" : "›"),
        top: (d) => (!d ? "ˬ" : "ˆ"),
      }

      const marginTop = {
        left: (d) => "-10px",
        bottom: (d) => (d ? "-15px" : "0px"),
        right: (d) => "-10px",
        top: (d) => (!d ? "-15px" : "0px"),
      }

      const lineHeight = {
        left: (d) => (d ? "1.2" : undefined),
        bottom: (d) => (!d ? "1.2" : undefined),
        right: (d) => (!d ? "1.2" : undefined),
        top: (d) => (d ? "1.2" : undefined),
      }

      const height = {
        left: (d) => (d ? "22px" : "23px"),
        bottom: (d) => (!d ? "11px" : undefined),
        right: (d) => (!d ? "22px" : "23px"),
        top: (d) => (d ? "11px" : undefined),
      }

      const iconDiv = document.createElement("div")
      iconDiv.textContent = icon[state.layout](node.children)
      iconDiv.style.fontSize = "25px"
      iconDiv.style.marginTop = marginTop[state.layout](node.children)
      iconDiv.style.lineHeight = lineHeight[state.layout](node.children)
      iconDiv.style.height = height[state.layout](node.children)
      iconDiv.style.color = "white"

      const containerDiv = document.createElement("div")
      containerDiv.style.margin = "auto auto"
      containerDiv.style.height = "20px"
      containerDiv.style.width = "40px"
      containerDiv.style.padding = "4px 15px"
      containerDiv.style.borderRadius = "56px"
      containerDiv.style.textAlign = "center"
      containerDiv.style.backgroundColor = "#FF4B4B"
      containerDiv.style.fontSize = "10px"

      containerDiv.appendChild(iconDiv)
      return containerDiv.outerHTML
    })
    .render()
}

// Attach our `onRender` handler to Streamlit's render event.
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)

// Tell Streamlit we're ready to start receiving data. We won't get our
// first RENDER_EVENT until we call this function.
Streamlit.setComponentReady()

// We are unable to get the height due to cross origin, but we try here.
let height = 1200

// Finally, tell Streamlit to update our initial height. We omit the
// `height` parameter here to have it default to our scrollHeight.
Streamlit.setFrameHeight(height)
