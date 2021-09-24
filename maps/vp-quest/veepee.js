const zoneList = {
    popupCrackTheCode: {
        message: "Play the crack the code game! The 1st scavenger hunt challenge on Veepee Quest. Click below to discover the page instruction and where to put the clue answers.", 
        buttons: [
            {
                label: "PADLOCK PAGE",
                className: "popUpElement",
                callback: (popupValue) => {
                    WA.nav.openTab('https://forms.gle/HE7P5Ue3KUyPpf956');
                    popupValue.close();
                }
            },
            {
                label: "GAME INSTRUCTION",
                className: "popUpElement",
                callback: (popupValue) => {
                    WA.nav.openCoWebSite('https://backup-workadventure-db-prod.s3-eu-west-1.amazonaws.com/map/VEEPEE_V6/CrackTheCode/veepee_quest_game.pdf');
                    popupValue.close();
                }
            },
        ]
    }
};

const zoneListArray = Object.keys(zoneList);
for(let i = 0; i < zoneListArray.length; i++) {
    const index = zoneListArray[i];
    let popup = null;
    WA.room.onEnterZone(index, () => {
        popup = WA.ui.openPopup(`${index}`, zoneList[index].message, zoneList[index].buttons);
    });
    console.log('define onLeaveZone');
    WA.room.onLeaveZone(index, () => {
        popup.close();
        WA.nav.closeCoWebSite();
    });
}
