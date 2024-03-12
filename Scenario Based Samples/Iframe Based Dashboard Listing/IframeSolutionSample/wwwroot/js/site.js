var loadedTileImgCount = 0;
var imagePaths = [
    "/images/dashboards/sales-activities-dashboard.svg",
    "/images/dashboards/healthcare-executive-dashboard.svg",
    "/images/dashboards/hr-recruitment-dashboard.svg",
    "/images/dashboards/real-estate-management-dashboard.svg",
    "/images/dashboards/school-performance-dashboard.svg"
];
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("#body-container").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("#body-container").style.visibility = "visible";
    }
};

jQuery(document).ready(function () {
    if (dashboardname != "") {
        var selectedDashboardDetail = {};
        $.each(categorylist, function (index, dbrdDetail) {
            if (dashboardname == (dbrdDetail.name).toLowerCase()) {
                selectedDashboardDetail = dbrdDetail;
            }
        });
        renderDashboardContainer(selectedDashboardDetail);
    }
    else {
        renderTileContainer(categorylist, categoryname);
    }
});

function renderTileContainer(dashboardData, categoryName) {
    loadedTileImgCount = 0;
    $('.sol-grid-container')
        .html("")
        .addClass("sol-grid-container-full-width")
        .removeClass("dashboard-sol-grid-container-activeleft")
        .removeClass("dashboard-sol-grid-container-activeright")
        .removeClass("dashboard-panel");
    generateBreadcrumbsContainer(categoryName);

    dbrdDetailLists = dashboardData;

    dashboardData.forEach(function (value, index) {
        // Create a new 'div' element to represent the dashboard in the UI.
        var dashboardDivTag = document.createElement('div');
        dashboardDivTag.classList.add('col-md-4', 'sol-container', 'dashboard-detail');
        setAttributes(dashboardDivTag, { "data-dbrd-name": value["name"], "data-dbrd-id": value["id"], "style": "display:none" });

        // Create an 'a' tag element and append it to the dashboard div element.
        var aDashboardTag = document.createElement('a');
        aDashboardTag.className = "dashboard-grid-container-atag";

        // Create an 'img' element to add the dashboard image inside the dashboard container.
        var aDashboardImgTag = document.createElement('img');
        aDashboardImgTag.classList.add('dashboard-image', 'sol-grid-container-full-width');
        setAttributes(aDashboardImgTag, { "src": getRandomImagePath(), "onload": "checkImageLoad()", "alt": value["name"] });

        // Create a 'div' element that appears when hovering over the 'a' tag element.
        var aDashboardHoverTag = document.createElement('div');
        aDashboardHoverTag.classList.add('dashboard-image-hover');

        // Create an 'img' tag element inside the hovering element to add the hover icon.
        var aDashboardHoverImgTag = document.createElement('img');
        aDashboardHoverImgTag.classList.add('dashboard-image-hover-icon', 'sol-grid-container-full-width');
        setAttributes(aDashboardHoverImgTag, { "src": "/images/hover-icon.svg", "alt": "Dashboard Hover Icon" });

        // Create a 'div' element to display text content when hovering over the element.
        var aDashboardHoverImgContTag = document.createElement('div');
        aDashboardHoverImgContTag.classList.add('hover-text', 'dashboard-image');
        aDashboardHoverImgContTag.textContent = 'Click to Run Sample';

        // Create a 'div' element to hold the title of the dashboard.
        var aDashboardTitleTag = document.createElement('div');
        aDashboardTitleTag.id = 'sol-imagetitle';

        // Create a new 'span' element to display the DashboardName in the title section.
        var aDashboardTitleContTag = document.createElement('span');
        aDashboardTitleContTag.className = "dashboard-grid-container-footer-tag";
        aDashboardTitleContTag.textContent = value['name'];

        aDashboardHoverTag.append(aDashboardHoverImgTag, aDashboardHoverImgContTag);
        aDashboardTitleTag.append(aDashboardTitleContTag);
        aDashboardTag.append(aDashboardImgTag, aDashboardHoverTag, aDashboardTitleTag);
        dashboardDivTag.append(aDashboardTag);

        $('.sol-grid-container').append(dashboardDivTag);
    });
}

// Function to randomly select an image path
function getRandomImagePath() {
    return imagePaths[Math.floor(Math.random() * imagePaths.length)];
}

//Methods to set the attributes to the DOM element.
function setAttributes(element, attributes) {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Methods To check the Tile Image is loaded.
function checkImageLoad() {
    const dashboardTileImageList = document.querySelectorAll('.dashboard-image.sol-grid-container-full-width');
    Array.prototype.some.call(dashboardTileImageList, img => {
        if (img.complete) {
            loadedTileImgCount++;
            return true;
        }
    })
    if (loadedTileImgCount == dashboardTileImageList.length) {
        $('#loader').hide();
        $('.sol-container.dashboard-detail').css('display', 'block');
    }
}

function renderDashboardContainer(dashboardDetail) {
    generateBreadcrumbsContainer(dashboardDetail.categoryName, dashboardDetail); //Create Breadcrumbs for the container.
    $('.sol-grid-container').html('').removeClass('sol-grid-container-full-width');
    $('#dashboard-property').show();

    dashboardDetails = { dashboardId: dashboardDetail.id };
    var dashboardDiv = document.createElement("div");
    dashboardDiv.id = "dashboard";
    $(".sol-grid-container").addClass("dashboard-panel");
    $('.sol-grid-container').append(dashboardDiv);
    currentDashboardNameFromURL = window.location.href.split('/').pop();
    renderDashboardWithIframe(dashboardDetail.embedUrl);
    $('#loader').hide();
}

function generateBreadcrumbsContainer(dashboardCategoryName, dashboardDetail) {
    var hasDashboardContainer = dashboardDetail != undefined ? true : false;
    $('#soln-bread-crumb').html('');
    switch (hasDashboardContainer) {
        case true:
            var solnBreadCrumb = document.getElementById('soln-bread-crumb');
            var parentCategory = document.createTextNode("Solutions");
            var level1 = document.createElement('span');
            level1.textContent = ' > ';
            level1.className = "breadcrumbs-arrow-spacing";
            var dashboardCategoryLink = document.createElement('a');
            dashboardCategoryLink.textContent = dashboardCategoryName;
            dashboardCategoryLink.classList.add('soln-bread-dbrdCateName');
            var level2 = document.createElement('span');
            level2.textContent = ' > ';
            level2.className = "breadcrumbs-arrow-spacing";
            var dashboardName = document.createTextNode(dashboardDetail.name);
            solnBreadCrumb.append(parentCategory, level1, dashboardCategoryLink, level2, dashboardName);
            break;
        case false:
            // This code updates the Category Breadcrumbs with the name of currently selected category.
            var solnBreadCrumb = document.getElementById('soln-bread-crumb');
            var parentCategory = document.createTextNode("Solutions");
            var level1 = document.createElement('span');
            level1.textContent = ' > ';
            level1.className = "breadcrumbs-arrow-spacing";
            var dashboardCategory = document.createTextNode(dashboardCategoryName);
            solnBreadCrumb.append(parentCategory, level1, dashboardCategory);
            break;
    }
}

function renderDashboardWithIframe(embedurl) {
    var parentElement = document.getElementById('dashboard');
    var iframe = document.createElement('iframe');
    var src = embedurl;
    iframe.src = src;
    iframe.id = 'iframedashboard';
    iframe.width = '100%';
    iframe.height = '100%';

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('frameborder', '0');
    parentElement.appendChild(iframe);
}

//The methods triggers when we clicks the dashboard tile in the grid container.
$(document).on("click", ".sol-grid-container .dashboard-detail", function () {
    var selectedDashboardDetail = {};
    var dashboardId = $(this)[0].dataset.dbrdId;
    $.each(dbrdDetailLists, function (index, dbrdDetail) {
        if (dashboardId == dbrdDetail.id) {
            selectedDashboardDetail = dbrdDetail;
        }
    });
    window.history.pushState({ page: "" }, "", ("/" + "solutions" + "/" + selectedDashboardDetail.categoryName + "/" + selectedDashboardDetail.name).toLowerCase());
    renderDashboardContainer(selectedDashboardDetail);
});

// The method triggers while dashboard category clicks in the breadcrumbs.
$(document).on("click", ".soln-bread-dbrdCateName", function () {
    $("ul#soln-list li").removeClass("active");
    $("ul#soln-list li").find("a[title='" + categoryname + "']").parents().addClass("active");
    window.history.pushState({ page: "" }, "", ("/solutions/" + categoryname).toLowerCase());
    renderTileContainer(categorylist, categoryname);
});