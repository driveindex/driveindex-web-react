export class UserPref {
    static get Login(): boolean {
        return UserPref.getBoolOrDef("Login", false)
    }
    static set Login(value: boolean) {
        localStorage["Login"] = value
    }

    static get Username(): string {
        return UserPref.getStrOrDef("username", "")
    }
    static set Username(value: string) {
        localStorage["Username"] = value
    }

    private static getStrOrDef(key: string, def: string): string {
        return localStorage["Login"] ?? def
    }
    private static getBoolOrDef(key: string, def: boolean): boolean {
        const value = localStorage["Login"]
        if (value == null) {
            return def
        } else {
            return value as boolean
        }
    }
}