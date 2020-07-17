/* We can't update the side panel with React, so this is quite tedious */

export const resetDetailAreas = function () {
    // const initialContent = document.getElementById("initialContent");
    // initialContent.style.display = "block";
    // const dynamicContent = document.getElementById("dynamicContent");
    // dynamicContent.style.display = "none";
    // const selectedStandardHeading = document.getElementById("selectedStandardHeadingWrapper");
    // selectedStandardHeading.style.display = "none";

    // todo

}

const updateDetails = function (d) {
    // if the node is a bullet point of a standard (standard topic),
    // then you want to show the cluster and the standard title
    // and highlight the specific selected topic
    let node = d;
    if (d.depth > 3) {
        node = d.parent;
    }
    // // capitalize first letter of clusterType
    const type = node.parent.data.data.clusterType;
    const typeStringPrepared = type.charAt(0).toUpperCase() + type.substring(1);

    // // if the standard has children, show those as bullet points below the desc
    let dds = [];
    if (d.depth > 3) {
        dds = node.children.map(topic => {
            const code = topic.data.data.code;
            const topicLetter = code.charAt(code.length - 1).toUpperCase();
            const ddTemplate = `
                <div class="${(topic.data.id === d.data.id) ? "selectedTopic" : ""}">
                    <dt>${topicLetter}</dt>
                    <dd>${topic.data.data.description}</dd>
                </div>
            `;
            return ddTemplate;
        });
    }
    let dl = "";

    if (dds.length) {
        dl = `<dl id="topics">
            ${dds.join("")}
        </dl>`;
    }

    // // add Khan Academy links
    const kaLinks = node.data.data.khanAcademyContent.map(link => {
        return `
            <li>
                <a href="${link["link"]}" target="_blank">
                    ${link["name"]}
                </a>
            </li>
        `;
    });

    let kaLinksList = "";

    if (kaLinks.length) {
        kaLinksList = `<div id="khanContent" style="display: block;">
            <ul>
                ${kaLinks.join("")}
            </ul>
        </div>`;
    }

    // insert in template
    const template = `
        <h2 class="sidePanelHeading">${node.data.data.code}</h2>
        <div id="cluster" class="cluster-${type}" style="display: block;">
            <strong id="clusterType">${typeStringPrepared} cluster</strong>
            <br>
            <div id="clusterDescription">
                ${node.parent.data.name}
            </div>
        </div>
        <div id="description">
            <p>${node.data.data.description}</p>
            ${dl}
            ${kaLinksList}
        </div>
    `;

    const detailsElement = document.getElementById('details-0');
    detailsElement.innerHTML = template;

}

export default updateDetails;