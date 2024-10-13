
import { MarkerType } from '@xyflow/react';
import kivuli from '../images/characters/Dialogue_KivuNaked.png'
import maku from '../images/characters/Dialogue_Maku2.png'
import samuri from '../images/characters/Dialogue_Sumari2.png'
import humina from '../images/characters/Dialogue_Merchant1.png'

export const iNodes = [
    //GeneralInformation Branch
    { id: 'generalInformation', type:'input', sourcePosition:'right', position: { x: 0, y: 0 }, data: { label: 'General Information' } },
    { id: 'species', targetPosition:'left', sourcePosition:'right', position: { x: 200, y: 0 }, data: { label: 'Species' } },
    { id: 'prowler', targetPosition:'top', sourcePosition:'bottom', position: { x: 600, y: 50 }, data: { label: 'Prowler' } },
    //Prowler Characters
    { id: 'kivuli', type:'cardNode', targetPosition:'left', position: { x: 800, y: 100 }, data: { label: 'Kivuli' , img : kivuli , "content" : {
                "list": {
                    "description": "The playable main character.",
                    "gender": "Male"
                }
            }} },
    { id: 'makuri', type:'cardNode', targetPosition:'left', position: { x: 800, y: 150 }, data: { label: 'Makuri', img : maku , "content" : {
                "list" : {
                    "description" : "Dusk Prowlers <s>ex-</s>chief.",
                    "gender" : "Male"
                }
            }} },
    { id: 'sumari', type:'cardNode', targetPosition:'left', position: { x: 800, y: 200 }, data: { label: 'Sumari' , img : samuri , "content" : {
                "list" : {
                    "description" : "Kivuli's Pack Brother.",
                    "gender" : "Male"
                }
            }} },
    //End of Prowler Characters
    { id: 'hawkster', targetPosition:'top', sourcePosition:'bottom', position: { x: 400, y: 50 }, data: { label: 'Hawkster' } },
    //Hawkster Characters
    { id: 'huMina', type:'cardNode', targetPosition:'left', position: { x: 800, y: 300 }, data: { label: 'Hu-Mina' , img : humina , "content" : {
                "list" : {
                    "description" : "A female merchant that frequented the Dusk Prowler's camp. Companion of Garth.",
                    "gender" : "Female"
                }
            }} },

    //Introduction branch
    { id: 'Introduction', type:'input', sourcePosition:'right', position: { x: 0, y: 150 }, data: { label: 'General Information' } },

    //Main Camp branch
    { id: 'Main Camp', type:'input', sourcePosition:'right', position: { x: 0, y: 300 }, data: { label: 'General Information' } },

    //Main Locations branch
    { id: 'Main Locations', type:'input', sourcePosition:'right', position: { x: 0, y: 450 }, data: { label: 'General Information' } },

    //Sub Locations branch
    { id: 'Sub Location', type:'input', sourcePosition:'right', position: { x: 0, y: 600 }, data: { label: 'General Information' } }
];
export const iEdges = [
    //GeneralInformation Branch Connections
    { id: 'a1-2', source: 'generalInformation', target: 'species',markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#9c65cd', },style: { strokeWidth: 1, stroke: '#9c65cd' }, type: 'smoothstep' },
    { id: 'a2-1', source: 'species', target: 'hawkster',markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#9c65cd', },style: { strokeWidth: 1, stroke: '#9c65cd' }, type: 'smoothstep' },
    { id: 'a2-2', source: 'species', target: 'prowler',markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#9c65cd', },style: { strokeWidth: 1, stroke: '#9c65cd' }, type: 'smoothstep' },
    //Prowler Branch Connections
    { id: 'a4-1', source: 'prowler', target: 'kivuli',markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#9c65cd', },style: { strokeWidth: 1, stroke: '#9c65cd' }, type: 'smoothstep' },
    { id: 'a4-2', source: 'prowler', target: 'makuri',markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#9c65cd', },style: { strokeWidth: 1, stroke: '#9c65cd' }, type: 'smoothstep' },
    { id: 'a4-3', source: 'prowler', target: 'sumari',markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#9c65cd', },style: { strokeWidth: 1, stroke: '#9c65cd' }, type: 'smoothstep' },
    //Hawkster Branch Connections
    { id: 'a3-1', source: 'hawkster', target: 'huMina',markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#9c65cd', },style: { strokeWidth: 1, stroke: '#9c65cd' }, type: 'smoothstep' },
];