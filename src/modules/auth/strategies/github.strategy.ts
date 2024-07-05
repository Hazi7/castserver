import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import type { AuthService } from '../auth.service';

@Injectable()   
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/github/callback',
            scope: ['user:email'],
        });
    }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: Function) {
    const user = await this.authService.validateUser('', '');
    done(null, user);
  }
}
