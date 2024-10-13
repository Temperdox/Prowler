import { memo, useState, useEffect } from 'react';
import { Handle } from 'reactflow';

const CardNode = ({ data = {} }) => {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        Object.entries(data).forEach(([key, value]) => {
            // console.log(`what: ${key}: ${value}`);
        });
    }, [data]);

    if (!data.content || !data.content.list) {
        return null; // Or provide a fallback UI
    }

    return (
        <div
            className="card-node"
            onClick={(evt) => {
                if (document.querySelector('.popup-content')) {

                    document.querySelectorAll('.popup-content').forEach(popup => {
                        popup.style.visibility = 'hidden';
                    });
                    document.querySelectorAll('.card-node.active-node').forEach(card => {
                        card.classList.remove('active-node');
                    });
                }
                evt.currentTarget.querySelector('.popup-content').style.visibility = 'visible';

                evt.currentTarget.classList.add('active-node');
            }}
        >
            <div className="wrapper gradient">
                <div className="inner">
                    {/* The main node label */}
                    <div>{data.label}</div>
                </div>
            </div>
            {/* Display hover content */}
            <div className="popup-content">
                <div className="card-title">
                    <div className="cardTitleBg"
                         style={{backgroundImage: data.img ? `url(${data.img})` : 'none'}}>

                    </div>
                    <div className="cardTitleBg-shadow"
                         style={{backgroundImage: data.img ? `url(${data.img})` : 'none'}}>
                    </div>
                    <h1 className="titleName">{data.label}</h1>
                </div>
                <div className="content-wedge"></div>
                <div className="content">
                    <div className="content-bg"></div>
                    <ul>
                        {Object.entries(data.content.list).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}</strong>:
                                {value.includes('<s>') && value.includes('</s>') ? (
                                    <span className="spoiler" title={value.replace(/<s>|<\/s>/g, '')}>
                    {value.replace(/<s>|<\/s>/g, '')}
                </span>
                                ) : "\n"+(
                                    value
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Handles for node connections */}
            <Handle type="target" position="left" />
        </div>
    );
};

export default memo(CardNode);