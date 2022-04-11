class UtilitiesClass{

    public IsInteger(value: any): boolean {

        //Significa que tem caracteres de uma string, logo é falso
        if (/^(\-|\+)?([0-9]+)$/.test(value) === false) return false;

        var valueInNumber = Number(value);
        return Number.isInteger(valueInNumber) && (Math.abs(valueInNumber) < 2147483647);
    }

    //Método para verificar se valor é data
    public IsDate(value: any): boolean {
        switch (typeof value) {
            case 'number':
                return true;
            case 'string':
                return !isNaN(Date.parse(value));
            case 'object':
                if (value instanceof Date) {
                    return !isNaN(value.getTime());
                } else {
                    return false;
                }
            default:
                return false;
        }
    }

    public LoadParameterFromURLQuery(parameterName: string, validadeParameterType: "string"|"date"|"number",defaultValue: any): any{
        try{
            var searchParams = new URLSearchParams(window.location.search);

            var parameterExist = searchParams.get(parameterName);
            if(parameterExist == null) return defaultValue;

            switch(validadeParameterType){
                case "date":
                    if(this.IsDate(parameterExist) === true){
                        return parameterExist
                    }
                    else{
                        return defaultValue;
                    }
                case "number":
                    if(this.IsInteger(parameterExist) === true){
                        return parseInt(parameterExist)
                    }else{
                        return defaultValue;
                    }
                case "string":
                    if(typeof parameterExist == "undefined" || parameterExist == null || parameterExist.trim().length<=0) return defaultValue;
                    return parameterExist.toString();
            }
        }
        catch(error){
            return defaultValue;
        }
    }
}

export const Utilities = new UtilitiesClass();