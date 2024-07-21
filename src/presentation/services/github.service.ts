import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";


export class GitHubService{

    constructor(){}

    onStar(payload:GitHubStarPayload):string{

        let message:string = '';

        const {starred_at,sender,repository,action} = payload;

        
        message = `User ${sender.login} ${action} star on ${repository.full_name} at ${starred_at}`
        

        return message;
    }

    onIssue(payload:GitHubIssuePayload):string{

        let message:string='';
        const {action,issue} = payload;

        if (action==='opened'){
            message = `An issue was opened with this name ${issue.title} by ${issue.user.login}`;
            
        }

        if (action==='closed'){
            message = `An issue was closed by ${issue.user.login}`;
            
        }

        if (action==='reopened'){
            message = `An issue was reopened by ${issue.user.login}`;
            
        }

        return message;

    }
}