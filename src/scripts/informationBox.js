class InformationBox
{
    constructor(content)
    {
        this.content = content;
    }

    setContent(content)
    {
        this.content = content;
    }

    show()
    {
        var box = document.getElementById("information");
        box.innerHTML = this.content;
        box.className = "";
    }
    
    hide()
    {
        document.getElementById("information").className = "hidden";
    }
}