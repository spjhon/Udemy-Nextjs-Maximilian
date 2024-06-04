function awesomePage(){

    let message = 'Bye There!';
    let random = Math.random();
    let types = 'text';
    let mini = 5;

    if (random > 0.5){
        message = "Hello there!";
    }

    return <div>
        <h1>{message}, {random}</h1>
        <input style={{border: '3px solid red'}} type={types} min={mini} autoFocus={true} spellCheck/>
        
        </div>
};



export default awesomePage;