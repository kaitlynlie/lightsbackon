import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {

    let selectedCategory = null;
    let selectedCounty = null;
    let selectedStatus = null;
    let searchText = "";

    const categoryFromURL = wixLocation.query.category;

    if (categoryFromURL) {
        selectedCategory = categoryFromURL;
    }

    // COLORS FOR SELECTED FILTERS
    const defaultColor = "#FFFFFF";
    const selectedColor = "#FCF1D8";

    // APPLY ALL ACTIVE FILTERS
    function applyFilters() {

        let filter = wixData.filter();

        if (selectedCategory) {
            filter = filter.hasSome("category", [selectedCategory]);
        }

        if (selectedCounty) {
            const countyFilter = wixData.filter()
                .hasSome("county", [selectedCounty])
                .or(
                    wixData.filter().hasSome("county", ["All"])
                );

            filter = filter.and(countyFilter);
        }

        if (searchText) {
            filter = filter.contains("title", searchText);
        }

        if (selectedStatus) {
            filter = filter.hasSome("status", [selectedStatus]);
        }

        $w("#dataset1").setFilter(filter)
            .then(() => {
                updateResultsCount();
            });

    }

    // UPDATE RESULTS COUNT
    function updateResultsCount() {

    $w("#dataset1").getItems(0, 1000)
        .then((result) => {

            const count = result.items.length;

            if (count === 1) {
                $w("#resultsCountText").text = "Showing 1 resource";
            } else {
                $w("#resultsCountText").text = `Showing ${count} resources`;
            }

        });

}

    // RESET ALL PILLS
    function resetPills() {

        const pills = [
            "#allCategoryPill",
            "#utilityPill",
            "#housingPill",
            "#foodPill",
            "#educationPill",

            "#allCountyPill",
            "#gwinnettPill",
            "#dekalbPill",
            "#fultonPill",
            "#cobbPill",

            "#allStatusPill",
            "#openIntakePill",
            "#limitedPill"
        ];

        pills.forEach((pill) => {
            $w(pill).style.backgroundColor = defaultColor;
        });

    }

    // SELECT A PILL
    function selectPill(pillID, group) {

        if (group === "category") {

            [
                "#allCategoryPill",
                "#utilityPill",
                "#housingPill",
                "#foodPill",
                "#educationPill"

            ].forEach((pill) => {
                $w(pill).style.backgroundColor = defaultColor;
            });

        }

        if (group === "county") {

            [
                "#allCountyPill",
                "#gwinnettPill",
                "#dekalbPill",
                "#fultonPill",
                "#cobbPill"

            ].forEach((pill) => {
                $w(pill).style.backgroundColor = defaultColor;
            });

        }

        if (group === "status") {

            [
                "#allStatusPill",
                "#openIntakePill",
                "#limitedPill"

            ].forEach((pill) => {
                $w(pill).style.backgroundColor = defaultColor;
            });

        }

        $w(pillID).style.backgroundColor = selectedColor;

    }

    if (selectedCategory === "Utility") {
        selectPill("#utilityPill", "category");
    }
    else if (selectedCategory === "Housing") {
        selectPill("#housingPill", "category");
    }
    else if (selectedCategory === "Food") {
        selectPill("#foodPill", "category");
    }
    else if (selectedCategory === "Education") {
        selectPill("#educationPill", "category");
    }
    else {
        selectPill("#allCategoryPill", "category");
    }

    // SEARCH
    $w("#searchInput").onInput(() => {

        searchText = $w("#searchInput").value.trim();

        applyFilters();

    });

    // CATEGORY FILTERS

    $w("#allCategoryPill").onClick(() => {
        selectedCategory = null;
        selectPill("#allCategoryPill", "category");
        applyFilters();
    });

    $w("#utilityPill").onClick(() => {
        selectedCategory = "Utility";
        selectPill("#utilityPill", "category");
        applyFilters();
    });

    $w("#housingPill").onClick(() => {
        selectedCategory = "Housing";
        selectPill("#housingPill", "category");
        applyFilters();
    });

    $w("#foodPill").onClick(() => {
        selectedCategory = "Food";
        selectPill("#foodPill", "category");
        applyFilters();
    });

    $w("#educationPill").onClick(() => {
        selectedCategory = "Education";
        selectPill("#educationPill", "category");
        applyFilters();
    });

    // COUNTY FILTERS

    $w("#allCountyPill").onClick(() => {
        selectedCounty = null;
        selectPill("#allCountyPill", "county");
        applyFilters();
    });

    $w("#gwinnettPill").onClick(() => {
        selectedCounty = "Gwinnett";
        selectPill("#gwinnettPill", "county");
        applyFilters();
    });

    $w("#dekalbPill").onClick(() => {
        selectedCounty = "DeKalb";
        selectPill("#dekalbPill", "county");
        applyFilters();
    });

    $w("#fultonPill").onClick(() => {
        selectedCounty = "Fulton";
        selectPill("#fultonPill", "county");
        applyFilters();
    });

    $w("#cobbPill").onClick(() => {
        selectedCounty = "Cobb";
        selectPill("#cobbPill", "county");
        applyFilters();
    });

    // STATUS FILTERS

    $w("#allStatusPill").onClick(() => {
        selectedStatus = null;
        selectPill("#allStatusPill", "status");
        applyFilters();
    });

    $w("#openIntakePill").onClick(() => {
        selectedStatus = "Open Intake";
        selectPill("#openIntakePill", "status");
        applyFilters();
    });

    $w("#limitedPill").onClick(() => {
        selectedStatus = "Limited";
        selectPill("#limitedPill", "status");
        applyFilters();
    });

    // CLEAR FILTERS

    $w("#clearFiltersButton").onClick(() => {

        selectedCategory = null;
        selectedCounty = null;
        selectedStatus = null;
        searchText = "";

        $w("#searchInput").value = "";

        resetPills();

        applyFilters();

    });

    // REPEATER STATUS PILLS

    $w("#repeater1").onItemReady(($item, itemData) => {

        $item("#greenPill").hide();
        $item("#yellowPill").hide();

        if (itemData.status && itemData.status.includes("Open Intake")) {

            $item("#greenPill").show();

        } else {

            $item("#yellowPill").show();

        }

    });

    // INITIAL COUNT

    $w("#dataset1").onReady(() => {

        applyFilters();

    });

});