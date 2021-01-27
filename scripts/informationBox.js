class InformationBox
{
    constructor(content)
    {
        this.content = content;
    }

    show(content, hasAction)
    {
        if (content !== undefined)
            this.content = content;

        if (hasAction !== undefined)
            document.getElementById("information-actions").classList.remove("hidden");
        
        document.getElementById("information-text").innerHTML = this.content;
        document.getElementById("information-wrapper").classList.remove("hidden");
    }
    
    hide()
    {
        document.getElementById("information-wrapper").classList.add("hidden");
    }
}

class TokenBox extends InformationBox
{
    constructor(id, text, onSuccess)
    {
        super();
        this.id = id;
        this.content = text;
        this.onSuccess = onSuccess;
        document.getElementById("information-action-button").addEventListener('click', () => this.onClick());
    }

    show(content)
    {
        super.show(content, true)
    }

    onClick()
    {
        if (this.isValid())
        {
            this.show("<p>The token is correct, well done!</p><p>Exit with [SPACEBAR]</p>");
            document.getElementById("information-actions").classList.add("hidden");

            this.onSuccess();
        }
        else
        {
            // TODO: Add error message
        }
    }

    isValid()
    {
        // TODO: Add call to back-end
        const token = document.getElementById("information-action-input").value;

        return token === "hitc_ctf{test_token_" + this.id + "}";
    }
}