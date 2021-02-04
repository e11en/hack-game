import React, { useState, useRef } from "react";
import styled from "styled-components";

const Card = styled.div`
    margin: 1em;
    padding: 1em;
    background-color: #FFFFFF;
    min-width: 740px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Content = styled.div`
    display: flex;

    & > div {
        margin: 1em;
    }
`;

const Tilesheet = styled.div`
    position: relative;
`;

const Selection = styled.div`
    outline: 3px solid cyan;
    width: 32px;
    height: 32px;
    position: absolute;
    left: ${props => props.selection[0] * 32}px;
    top: ${props => props.selection[1] * 32}px;
`;

const Canvas = styled.canvas`
    background-color: #ececec;
`;

const LayerEditing = styled.div`
    display: flex;
    flex-direction: column;

    & > button {
        width: 10em;
    }
`;

const Label = styled.h4`
    margin: 0 0 1em;
`;

const Info = styled.p`
    margin: 0 0 1em;
    font-size: 0.8em;
    color: #aaa;
    text-align: center;
`;

const intialLayerState = [
    {"0-0": [4, 10],"0-1": [4, 10],"0-2": [4, 10],"0-3": [4, 10],"0-4": [3, 0],"0-5": [3, 1],"0-6": [3, 2],"0-7": [3, 6],"0-8": [2, 6],"0-9": [3, 6],"0-10": [2, 6],"0-11": [3, 6],"0-12": [2, 6],"0-13": [3, 6],"0-14": [4, 10],"1-0": [4, 10],"1-1": [4, 10],"1-2": [4, 10],"1-3": [4, 10],"1-4": [4, 0],"1-5": [4, 1],"1-6": [4, 2],"1-7": [2, 6],"1-8": [3, 6],"1-9": [2, 6],"1-10": [3, 6],"1-11": [2, 6],"1-12": [3, 6],"1-13": [2, 6],"1-14": [4, 10],"2-0": [4, 10],"2-1": [4, 10],"2-2": [4, 10],"2-3": [4, 10],"2-4": [4, 0],"2-5": [4, 1],"2-6": [4, 2],"2-7": [3, 6],"2-8": [2, 6],"2-9": [3, 6],"2-10": [2, 6],"2-11": [3, 6],"2-12": [2, 6],"2-13": [3, 6],"2-14": [4, 10],"3-0": [4, 10],"3-1": [4, 10],"3-2": [4, 10],"3-3": [4, 10],"3-4": [4, 0],"3-5": [4, 1],"3-6": [4, 2],"3-7": [2, 6],"3-8": [3, 6],"3-9": [2, 6],"3-10": [3, 6],"3-11": [2, 6],"3-12": [3, 6],"3-13": [2, 6],"3-14": [4, 10],"4-0": [4, 10],"4-1": [4, 10],"4-2": [4, 10],"4-3": [4, 10],"4-4": [4, 0],"4-5": [4, 1],"4-6": [4, 2],"4-7": [3, 6],"4-8": [2, 6],"4-9": [3, 6],"4-10": [2, 6],"4-11": [3, 6],"4-12": [2, 6],"4-13": [3, 6],"4-14": [4, 10],"5-0": [4, 10],"5-1": [4, 10],"5-2": [4, 10],"5-3": [4, 10],"5-4": [4, 0],"5-5": [4, 1],"5-6": [4, 2],"5-7": [2, 6],"5-8": [3, 6],"5-9": [2, 6],"5-10": [3, 6],"5-11": [2, 6],"5-12": [3, 6],"5-13": [2, 6],"5-14": [4, 10],"6-0": [4, 10],"6-1": [4, 10],"6-2": [4, 10],"6-3": [4, 10],"6-4": [4, 0],"6-5": [4, 1],"6-6": [4, 2],"6-7": [3, 6],"6-8": [2, 6],"6-9": [3, 6],"6-10": [2, 6],"6-11": [3, 6],"6-12": [2, 6],"6-13": [3, 6],"6-14": [4, 10],"7-0": [4, 10],"7-1": [4, 10],"7-2": [4, 10],"7-3": [4, 10],"7-4": [4, 0],"7-5": [4, 1],"7-6": [4, 2],"7-7": [2, 6],"7-8": [3, 6],"7-9": [2, 6],"7-10": [3, 6],"7-11": [2, 6],"7-12": [3, 6],"7-13": [2, 6],"7-14": [4, 10],"8-0": [4, 10],"8-1": [4, 10],"8-2": [4, 10],"8-3": [4, 10],"8-4": [4, 0],"8-5": [4, 1],"8-6": [4, 2],"8-7": [3, 6],"8-8": [2, 6],"8-9": [3, 6],"8-10": [2, 6],"8-11": [3, 6],"8-12": [2, 6],"8-13": [3, 6],"8-14": [4, 10],"9-0": [4, 10],"9-1": [4, 10],"9-2": [4, 10],"9-3": [4, 10],"9-4": [4, 0],"9-5": [4, 1],"9-6": [4, 2],"9-7": [2, 6],"9-8": [3, 6],"9-9": [2, 6],"9-10": [3, 6],"9-11": [2, 6],"9-12": [3, 6],"9-13": [2, 6],"9-14": [4, 10],"10-0": [4, 10],"10-1": [4, 10],"10-2": [4, 10],"10-3": [4, 10],"10-4": [4, 0],"10-5": [4, 1],"10-6": [4, 2],"10-7": [3, 6],"10-8": [2, 6],"10-9": [3, 6],"10-10": [2, 6],"10-11": [3, 6],"10-12": [2, 6],"10-13": [3, 6],"10-14": [4, 10],"11-0": [4, 10],"11-1": [4, 10],"11-2": [4, 10],"11-3": [4, 10],"11-4": [4, 0],"11-5": [4, 1],"11-6": [4, 2],"11-7": [2, 6],"11-8": [3, 6],"11-9": [2, 6],"11-10": [3, 6],"11-11": [2, 6],"11-12": [3, 6],"11-13": [2, 6],"11-14": [4, 10],"12-0": [4, 10],"12-1": [4, 10],"12-2": [4, 10],"12-3": [4, 10],"12-4": [4, 0],"12-5": [4, 1],"12-6": [4, 2],"12-7": [3, 6],"12-8": [2, 6],"12-9": [3, 6],"12-10": [2, 6],"12-11": [3, 6],"12-12": [2, 6],"12-13": [3, 6],"12-14": [4, 10],"13-0": [4, 10],"13-1": [4, 10],"13-2": [4, 10],"13-3": [4, 10],"13-4": [4, 0],"13-5": [4, 1],"13-6": [4, 2],"13-7": [2, 6],"13-8": [3, 6],"13-9": [2, 6],"13-10": [3, 6],"13-11": [2, 6],"13-12": [3, 6],"13-13": [2, 6],"13-14": [4, 10],"14-0": [4, 10],"14-1": [4, 10],"14-2": [4, 10],"14-3": [4, 10],"14-4": [5, 0],"14-5": [5, 1],"14-6": [5, 2],"14-7": [3, 6],"14-8": [2, 6],"14-9": [3, 6],"14-10": [2, 6],"14-11": [3, 6],"14-12": [2, 6],"14-13": [3, 6],"14-14": [4, 10]},
    {"0-13": [3, 6],"0-14": [3, 7],"1-14": [3, 7],"2-13": [3, 6],"2-14": [3, 7],"3-14": [3, 7],"4-13": [3, 6],"4-14": [3, 7],"5-14": [3, 7],"6-13": [3, 6],"6-14": [3, 7],"7-14": [3, 7],"8-13": [3, 6],"8-14": [3, 7],"9-14": [3, 7],"10-13": [3, 6],"10-14": [3, 7],"11-14": [3, 7],"12-13": [3, 6],"12-14": [3, 7],"13-14": [3, 7],"14-13": [3, 6],"14-14": [3, 7]},
    {"5-5": [4, 1],"6-5": [3, 13],"7-5": [0, 14],"8-5": [1, 16],"9-5": [2, 12]},
];

export default () => {
    const [selection, setSelection] = useState([0,0]);
    const canvasRef = useRef();
    const imageRef = useRef();
    const [currentLayer, setCurrentLayer] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [layers, setLayers] = useState(intialLayerState);

    const exportMap = () => {
        const data = canvasRef.current.toDataURL();
        const image = new Image();
        image.src = data;

        const w = window.open("");
        w.document.write(image.outerHTML);
    };

    const clearMap = () => {
        setLayers([{}, {}, {}]);
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, 480, 480);
    };
    
    const draw = () => {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, 480, 480);

        const sizeOfCrop = 32;
        
        layers.forEach(layer => {
            Object.keys(layer).forEach(key => {
                const positionX = Number(key.split("-")[0]);
                const positionY = Number(key.split("-")[1]);
                const [tilesheetX, tilesheetY] = layer[key];

                context.drawImage(
                    imageRef.current,
                    tilesheetX * 32, tilesheetY * 32,
                    sizeOfCrop, sizeOfCrop,
                    positionX * 32, positionY * 32,
                    sizeOfCrop, sizeOfCrop
                );
            });
        });
    };

    const getCoordinates = (e) => {
        const { x, y } = e.target.getBoundingClientRect();
        const mouseX = e.clientX - x;
        const mouseY = e.clientY - y;
    
        return [Math.floor(mouseX / 32), Math.floor(mouseY / 32)];
    };

    const addTile = (e) => {
        const coordinates = getCoordinates(e);
        const key = coordinates[0] + "-" + coordinates[1];

        if (e.shiftKey)
        {
            const arr = layers;
            delete arr[currentLayer][key];
            setLayers(arr);
        }
        else {
            const arr = layers;
            arr[currentLayer][key] = [selection[0], selection[1]];
            setLayers(arr);
        }

        draw();
    };

    const onCanvasMouseDown = (e) => {
        setIsMouseDown(true);
        addTile(e);
    };

    const onCanvasMouseMove = (e) => {
        if (isMouseDown)
            addTile(e);
    };

    return (
        <Card>
            <Actions>
                <button onClick={clearMap}>Clear Map</button>
                <button onClick={exportMap}>Export Map</button>
            </Actions>
            <Content>
                <div>
                    <Label>Tiles</Label>
                    <Tilesheet onMouseDown={e => setSelection(getCoordinates(e))}>
                        <img crossOrigin="true" src={process.env.PUBLIC_URL + "resources/maps/tile-sheet.png"} ref={imageRef} onLoad={() => draw()} alt="tile sheet"/>
                        <Selection selection={selection}/>
                    </Tilesheet>
                </div>
                <div>
                    <Canvas width="480" 
                            height="480" 
                            ref={canvasRef} 
                            onMouseDown={onCanvasMouseDown} 
                            onMouseUp={() => setIsMouseDown(false)}
                            onMouseLeave={() => setIsMouseDown(false)}
                            onMouseMove={onCanvasMouseMove}
                            />
                    <Info><b>Click</b> to paint. <b>Shift+Click</b> to remove.</Info>
                    <LayerEditing>
                        <Label>Editing Layer:</Label>
                        <button onClick={() => setCurrentLayer(2)}>Top Layer</button>
                        <button onClick={() => setCurrentLayer(1)}>Middle Layer</button>
                        <button onClick={() => setCurrentLayer(0)}>Bottom Layer</button>
                    </LayerEditing>
                </div>
            </Content>
        </Card>
    );
};