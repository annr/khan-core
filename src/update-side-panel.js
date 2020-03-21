/* We can't update the side panel with React, so this is quite tedious */

export const resetSidePanel = function () {
    const initialContent = document.getElementById("initialContent");
    initialContent.style.display = "block";
    const dynamicContent = document.getElementById("dynamicContent");
    dynamicContent.style.display = "none";
    const selectedStandardHeading = document.getElementById("selectedStandardHeadingWrapper");
    selectedStandardHeading.style.display = "none";
}

const updateSidePanel = function (d) {
    // if the node is a bullet point of a standard (standard topic),
    // then you want to show the cluster and the standard title
    // and highlight the specific selected topic
    let node = d;
    if (d.depth > 3) {
        node = d.parent;
    }

    // get all the elements from side panel that need to be updated.
    // this is old school!
    const selectedStandardHeading = document.getElementById("selectedStandardHeadingWrapper");
    selectedStandardHeading.style.display = "block";

    const initialContent = document.getElementById("initialContent");
    initialContent.style.display = "none";

    const dynamicContent = document.getElementById("dynamicContent");
    dynamicContent.style.display = "block";

    const dynamicHeading = document.getElementById("selectedStandardHeadingWrapper");
    dynamicHeading.innerHTML = "";
    const heading = document.createElement("h2");
    heading.className = "sidePanelHeading";
    dynamicHeading.appendChild(heading)

    const cluster = document.getElementById("cluster");
    const clusterType = document.getElementById("clusterType");
    const clusterDescription = document.getElementById("clusterDescription");

    const description = document.getElementById("description");
    const topics = document.createElement('dl');

    const khanContent = document.getElementById('khanContent');
    const khanContentLinks = document.getElementById('khanContentLinks');
    khanContentLinks.innerHTML = "";
    topics.id = "topics";

    // capitalize first letter of clusterType
    const type = node.parent.data.data.clusterType;
    const typeStringPrepared = type.charAt(0).toUpperCase() + type.substring(1);

    clusterType.textContent = `${typeStringPrepared} cluster`;
    clusterDescription.innerHTML = node.parent.data.name;
    cluster.style.display = "block";

    heading.textContent = node.data.data.code;

    // if the standard has children, show those as bullet points below the desc
    if (d.depth > 3) {
        node.children.forEach(topic => {
            const code = topic.data.data.code;
            const topicLetter = code.charAt(code.length - 1).toUpperCase();
            const div = document.createElement('div');
            if (topic.data.id === d.data.id) {
                div.className = "selectedTopic";
            }
            const dt = document.createElement('dt');
            dt.textContent = topicLetter;
            const dd = document.createElement('dd');
            dd.innerHTML = topic.data.data.description;
            div.appendChild(dt);
            div.appendChild(dd);
            topics.appendChild(div);
        });
    }

    // add Khan Academy links
    node.data.data.khanAcademyContent.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const linkText = document.createTextNode(link["name"]);
        a.appendChild(linkText);
        a.title = link["name"];
        a.href = link["link"];
        a.target = "_blank";
        li.appendChild(a);
        khanContentLinks.appendChild(li);
    });

    description.innerHTML = node.data.data.description;
    description.appendChild(topics);
    if (node.data.data.khanAcademyContent.length > 0) {
        khanContent.appendChild(khanContentLinks);
        khanContent.style.display = "block";
    } else {
        khanContent.style.display = "none";
    }
}

export default updateSidePanel;