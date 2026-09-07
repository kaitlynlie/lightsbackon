import wixLocation from 'wix-location';
import wixAnimations from 'wix-animations';
import { local } from 'wix-storage';
import wixWindow from 'wix-window';

export function foodBox_click() {
    wixLocation.to("/find-help?category=Food");
}

export function housingBox_click() {
    wixLocation.to("/find-help?category=Housing");
}

export function utilityBox_click() {
    wixLocation.to("/find-help?category=Utility");
}

export function educationBox_click() {
    wixLocation.to("/find-help?category=Education");
}

$w.onReady(function () {

    local.removeItem("welcomeShown");

    if (
        wixWindow.formFactor === "Desktop" &&
        !local.getItem("welcomeShown")
    ) {
        setTimeout(() => {
            wixWindow.openLightbox("What brings you here today?")
            local.setItem("welcomeShown", "true");
        }, 2000);
    }

    $w("#text186").onClick(() => {
        utilityBox_click();
    });

	$w('#text187').onClick((event) => {
        housingBox_click();
	})

	$w('#text190').onClick((event) => {
        foodBox_click();
	})

	$w('#text199').onClick((event) => {
        educationBox_click();
	})

    const buttons = [
        "#button23",
        "#button24",
        "#button25",
        "#button26"
    ];

    buttons.forEach((buttonId) => {
        const button = $w(buttonId);

        button.onMouseIn(() => {
            wixAnimations.timeline()
                .add(button, {
                    duration: 200,
                    y: -4,
                    scale: 1.03,
                    easing: "easeOut"
                })
                .play();
        });

        button.onMouseOut(() => {
            wixAnimations.timeline()
                .add(button, {
                    duration: 200,
                    y: 0,
                    scale: 1,
                    easing: "easeOut"
                })
                .play();
        });
    });
    
    $w("#box35").onClick(() => {
        wixLocation.to("/partner/restoring-one's-hope");
    });

    $w("#box36").onClick(() => {
        wixLocation.to("/partner/nationalcoalitionforthehomeless");
    });

    $w("#image11").hide();
    $w("#image12").hide();
    $w("#image13").hide();
    $w("#image14").hide();

    $w("#box29").onMouseIn(() => {
        $w("#image11").show("fade", {
            duration: 300
        });
    });

    $w("#box29").onMouseOut(() => {
        $w("#image11").hide("fade", {
            duration: 300
        });
    });

    $w("#box30").onMouseIn(() => {
        $w("#image12").show("fade", {
            duration: 300
        });
    });

    $w("#box30").onMouseOut(() => {
        $w("#image12").hide("fade", {
            duration: 300
        });
    });

    $w("#box31").onMouseIn(() => {
        $w("#image13").show("fade", {
            duration: 300
        });
    });

    $w("#box31").onMouseOut(() => {
        $w("#image13").hide("fade", {
            duration: 300
        });
    });

    $w("#box34").onMouseIn(() => {
        $w("#image14").show("fade", {
            duration: 300
        });
    });

    $w("#box34").onMouseOut(() => {
        $w("#image14").hide("fade", {
            duration: 300
        });
    });
});