import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";


export class GitHubController{

    constructor(
        private readonly gitHubService = new GitHubService(),
        private readonly discordService = new DiscordService()
    ){}

    webHookHandler = (req:Request,res:Response)=>{

        const githubEvent = req.header('x-github-event') ?? 'desconocido';
        const signature = req.header('x-hub-signature-256') ?? 'desconocido';
        const payload =req.body;
        let message = '';
        
        switch (githubEvent){

            case 'star':
                message = this.gitHubService.onStar(payload);
            break;
            case 'issues':
                message = this.gitHubService.onIssue(payload);
            break;
            default:
                message=`unknow event ${githubEvent}`;
        }

        this.discordService.notify(message)
            .then(()=> res.status(202).json('acepted'))
            .catch(()=>res.status(500).json({error:'internal server error'}))

        
    
    }

}