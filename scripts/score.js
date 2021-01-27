class Score {
    constructor()
    {
        const storedHealth = window.localStorage.getItem("health");
        const storedLevel = window.localStorage.getItem("level");

        this.health = storedHealth == null ? 100 : storedHealth;
        this.level = storedLevel == null ? 1 : storedLevel;
        this.isSaving = false;

        document.getElementById("hud-health").innerText = this.health;
    }

    save()
    {
        this.showSavingIndicator();

        window.localStorage.setItem("health", this.health);
        window.localStorage.setItem("level", this.level);

        this.hideSavingIndicator();
    }

    showSavingIndicator()
    {
        this.isSaving = true;
        document.getElementById("saving").classList.remove("hidden");
    }

    hideSavingIndicator()
    {
        this.isSaving = false;
        document.getElementById("saving").classList.add("hidden");
    }

    setHealth(health)
    {
        this.health = health;
        document.getElementById("hud-health").innerText = this.health;
        
        if (this.health == 0)
            gameArea.stop();
    }
}