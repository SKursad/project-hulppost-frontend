import React, {useEffect} from 'react';
import Card from '../Card/Card';

const Screen = (props) => {
    useEffect(() => {
        document.title = `${props.title} | HulpPost`;
        window.scrollTo(0, 0);
    }, []);

    return <Card wide={props.wide}>{props.children}</Card>;
};

export default Screen;
