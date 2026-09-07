import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

const options = [
    {
        _id: "1",
        title: "I need help",
        action: "help",
        icon: "https://static.wixstatic.com/shapes/ace383_a9766c9dbd964618b849996a1805a2af.svg"
    },
    {
        _id: "2",
        title: "I'm here to partner",
        action: "partners",
        icon: "https://static.wixstatic.com/shapes/ace383_905ce3f0eaf343758487b2d4fbe4a8f9.svg"
    },
    {
        _id: "3",
        title: "I want to volunteer",
        action: "volunteer",
        icon: "https://static.wixstatic.com/shapes/ace383_f7b1e45c0dd84054878040cb00a72a30.svg"
    },
    {
        _id: "4",
        title: "Just browsing",
        action: "close",
        icon: "https://static.wixstatic.com/shapes/ace383_14fbc68e2343404989f76def23acbafd.svg"
    }
];


$w.onReady(() => {

    $w("#repeater1").onItemReady(($item, itemData) => {

        $item("#text1").text = itemData.title;
        $item("#vectorImage12").src = itemData.icon;

        $item("#box1").onClick(() => {

            switch(itemData.action) {

                case "help":
                    wixLocation.to("/find-help");
                    break;

                case "partners":
                    wixLocation.to("/partners");
                    break;

                case "volunteer":
                    wixLocation.to("/volunteer");
                    break;

                case "close":
                    wixWindow.lightbox.close();
                    break;
            }

        });

    });

    $w("#repeater1").data = options;

    $w("#text240").onClick(() => {
        wixWindow.lightbox.close();
    });

});