class InformationBox
{
    setContent(content)
    {
        document.getElementById("information").innerHTML = content;
    }

    show()
    {
        document.getElementById("information-wrapper").className = "";
    }
    
    hide()
    {
        document.getElementById("information-wrapper").className = "hidden";
    }
}