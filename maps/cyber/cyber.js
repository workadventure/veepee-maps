// Intialisation des variables des nom des zones de popUp
// Les noms doivent être les mêmes que les noms des rectangles définis dans Tiled dans le layer object floorLayer
// Ces rectangles définissent la zone ou apparaîtra le popup
// Dans Tiled un layer doit être créé avec le nom de chaque zone de PopUp en retirant le mot Name
// Le nom des layers reprends le nom des variables zone
// Il suffit alors de positionner des tuiles pour definir ou le popUp sera declenche
// Ajouter alors la propriete zone avec le nom du popUp a chacun de ces layers

// Message dans le log de la console web
console.log("SCRIPT IS COMING!");


var zone0TeleportName = "popUp0Teleport";

// variables des url utilisées
var urlTeleport = "https://hart.ouvaton.org/chamane2/";

// Autres variables
var currentPopup = undefined;
var isCoWebSiteOpened =  false;

// popUp quand on entre dans la zone de téléportation
WA.onEnterZone(zone0TeleportName, () => {
	currentPopup =  WA.openPopup("popUp0Teleport","Attention, zone de téléportation !",[
        {
            label: "GO!",
            className: "popUpElement",
            callback: (popup => {
				WA.goToPage(urlTeleport);
//                WA.openCoWebSite(urlTeleport);
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }]);
})
WA.onLeaveZone(zone0TeleportName, closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}