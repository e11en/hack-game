class InformationBox
{
    constructor(content, hasAction)
    {
        this.content = content;
        this.hasAction = hasAction;
    }

    show(content)
    {
        if (content !== undefined)
            this.content = content;

        if (this.hasAction !== undefined)
            document.getElementById("information-actions").classList.remove("hidden");
        
        document.getElementById("information-text").innerHTML = this.content;
        document.getElementById("information-wrapper").classList.remove("hidden");
    }
    
    hide()
    {
        if (this.hasAction !== undefined)
            document.getElementById("information-actions").classList.add("hidden");

        document.getElementById("information-wrapper").classList.add("hidden");
    }
}

class TokenBox extends InformationBox
{
    constructor(id, text, onSuccess, onClose)
    {
        super(undefined, true);
        this.id = id;
        this.content = text;
        this.onSuccess = onSuccess;
        this.onClose = onClose;
        document.getElementById("information-action-button").addEventListener('click', () => this.onClick());
        document.getElementById("information-close-button").addEventListener('click', () => this.onCloseClick());
    }

    onCloseClick()
    {
        this.onClose();
        this.hide();
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