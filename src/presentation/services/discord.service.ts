import { envs } from "../../config";


export class DiscordService{

    private readonly discordEbHookUrl:string = envs.DISCORD_WEBHOOH_URL;

    constructor(){}

    async notify (message:string){

        const body = {
            content:message,
           /* embeds:[
                {
                    image:{url:'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWd0bjZpNzZvMDhhaWgxMGpvOHA0M24waHJjazY1emFjM3c1NWRqMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif'}
                }
            ]*/
        }
        const resp = await fetch(this.discordEbHookUrl, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(body),
        })

        if (!resp.ok){
            console.log('Error sending message to disscord');
            return false;
        }

        return true;
    }

}