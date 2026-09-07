import wixLocation from 'wix-location';

$w.onReady(() => {

    $w("#repeater1").onItemReady(($item, itemData) => {

        $item("#container1").onClick(() => {
            wixLocation.to(itemData["link-partners-1-title"]);
        });

    });

});