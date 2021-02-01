class InformationBox
{
    constructor(content, hasAction, overrideOnKeyDown)
    {
        this.content = content;
        this.hasAction = hasAction;
        this.open = false;

        if (!overrideOnKeyDown)
            window.addEventListener('keydown', (e) => this.onKeyDown(e.key));
    }

    show(content)
    {
        this.open = true;
        if (content !== undefined)
            this.content = content;

        if (this.hasAction !== undefined)
            document.getElementById("information-actions").classList.remove("hidden");
        
        document.getElementById("information-text").innerHTML = this.content;
        document.getElementById("information-wrapper").classList.remove("hidden");
    }
    
    hide()
    {
        this.open = false;
        gameArea.characterIsInteracting = false;

        if (this.hasAction !== undefined)
            document.getElementById("information-actions").classList.add("hidden");

        document.getElementById("information-text").innerHTML = "";
        document.getElementById("information-wrapper").classList.add("hidden");
    }

    onKeyDown(keyPressed)
    {
        if (keyPressed !== " " || !this.open) return;

        this.hide();
    }
}

class TokenBox extends InformationBox
{
    constructor(id, text, onSuccess, onClose)
    {
        super(undefined, true, true);
        this.id = id;
        this.content = text;
        this.onSuccess = onSuccess;
        this.onClose = onClose;
        document.getElementById("information-action-button")?.addEventListener('click', () => this.onClick());
        document.getElementById("information-close-button")?.addEventListener('click', () => this.onCloseClick());
    }

    onCloseClick()
    {
        this.cleanUp();
        this.onClose();
        this.hide();
    }

    onClick()
    {
        if (this.isValid())
        {
            this.show("<p>The token is correct, well done!</p>");

            this.cleanUp();
            this.onSuccess();
        }
        else
        {
            document.getElementById("information-actions-text").classList.remove("hidden");
        }
    }

    cleanUp()
    {
        document.getElementById("information-actions").classList.add("hidden");
        document.getElementById("information-actions-text").classList.add("hidden");
    }

    isValid()
    {
        // TODO: Add call to back-end
        const token = document.getElementById("information-action-input").value;

        return token === "hitc_ctf{test_token_" + this.id + "}";
    }
}