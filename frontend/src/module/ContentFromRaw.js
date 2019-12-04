import {convertFromRaw} from 'draft-js'

const contentFromRaw = (rawString) => {
    //convert rawString to contentState form 
    //parameter must be JSON-parsable string
    
    let content = '';
    try{
        const contentState = convertFromRaw(JSON.parse(rawString));
        let string;
        const contentBlocks = contentState.getBlocksAsArray();
        for(let i = 0; i < contentBlocks.length ; i++){
            string = contentBlocks[i].getText();
            content = content + string + '\n';
        }
    }
    catch(e){
        content = rawString;
        console.error('parameter string is not convertable to Draft.js contentState format')
    }

    
    return content
}

export default contentFromRaw