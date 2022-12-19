import { AuthService } from '../auth.service';
import { Payload } from 'src/modules/login/login.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(request: Request, payload: Payload): Promise<{
        userId: number;
    }>;
}
export {};
