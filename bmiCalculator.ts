/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const calculateBmi = (height : number, weight : number) : string => {
    const heightInMetres = height / 100;
    const bmi = weight/(heightInMetres*heightInMetres);
    if(height === 0 || weight === 0) {
        throw new Error('Wrong parameters');
    } else if(bmi < 18.5) {
        return "Abnormal! (underweight)";
    } else if(bmi >=18.5 && bmi <=24.9) {
        return "Normal (healthy)";
    } else if(bmi >= 25 && bmi <= 29.9) {
        return "Abnormal! (overweight)";
    } else if(bmi >= 30 && bmi <= 39.9) {
        return "Abnormal!! (obese)";
    } else {
        throw new Error('Provided height and weight aree wrong');
    }
};

interface measurements {
    height: number;
    weight: number;
}

const parseValuesForBMI = (args: Array<string>) : measurements => {
    if(args.length !== 4) throw new Error('Invalid no of arguments');
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height : Number(args[2]),
            weight : Number(args[3])
        };
    } else {
        throw new Error('Provided values are not numbers');
    }
};
try {
    const { height , weight } = parseValuesForBMI(process.argv);
    console.log(calculateBmi(height,weight));
} catch(e) {
    console.log(`Something went wrong, error: ${e.message}`);
}
