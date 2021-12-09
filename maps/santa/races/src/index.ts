/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

const IFRAME_HEIGHT = 253;
const IFRAME_WIDTH = 294;
const IFRAME_X = 962;
const IFRAME_Y = 38;

const createNewEmbedWebsite = (cinemaScreenVariable: string) => {
    WA.room.website.get('cinemaScreen').then((holdWebsite) => {
        console.log('onVariableChange => WA.room.website.get => data', holdWebsite);

        console.log('onVariableChange => WA.room.website.get => then => create');
        WA.room.website.create({
            name: holdWebsite && holdWebsite.name ? holdWebsite.name : "cinemaScreen",
            url: cinemaScreenVariable,
            position: {
                height: holdWebsite && holdWebsite.height ? holdWebsite.height : IFRAME_HEIGHT,
                width: holdWebsite && holdWebsite.width ? holdWebsite.width : IFRAME_WIDTH,
                x: holdWebsite && holdWebsite.x ? holdWebsite.x : IFRAME_X,
                y: holdWebsite && holdWebsite.y ? holdWebsite.y : IFRAME_Y,
            },
            visible: holdWebsite && holdWebsite.visible ? holdWebsite.visible : true,
            allowApi:  true,
            allow: "fullscreen",
        } as any);

        console.log('onVariableChange => WA.room.website.get => then => delete');
        WA.room.website.delete('cinemaScreen');
    }).catch((err) => {
        console.error('onVariableChange => WA.room.website.get => catch => err', err);
        WA.room.website.create({
            name: "cinemaScreen",
            url: cinemaScreenVariable,
            position: {
                height: IFRAME_HEIGHT,
                width: IFRAME_WIDTH,
                x: IFRAME_X,
                y: IFRAME_Y,
            },
            visible: true,
            allowApi:  true,
            allow: "fullscreen",
        });
    });
}


const cinemaScreenVariable = WA.state.loadVariable('cinemaScreenVariable');
if(cinemaScreenVariable !== undefined){
    createNewEmbedWebsite(cinemaScreenVariable as string);
}

WA.state.onVariableChange('cinemaScreenVariable').subscribe((cinemaScreenVariable: unknown) => {
    console.log('cinemaScreenVariable => data', cinemaScreenVariable);
    if(cinemaScreenVariable === undefined){
        return;
    }
    createNewEmbedWebsite(cinemaScreenVariable as string);
});
