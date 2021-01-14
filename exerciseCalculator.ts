
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
interface values {
    dailyValues: Array<number>;
    target: number;
}

const parseValues = (args: Array<string>) : values => {
    if(args.length < 4) throw new Error('Not enough values provided');
    const dailyValues : Array<number> = [];
    let target = null;
    if(!isNaN(Number(args[2]))) {
        target = Number(args[2]);
    } else throw new Error('Provided values contains non-integers');
    for(let i = 3; i < args.length; i++) {
        if(isNaN(Number(args[i]))) {
            throw new Error('Provided values contains non-integers');
        } else {
            dailyValues.push(Number(args[i]));
        }
    } 
    return {
        dailyValues,
        target
    };
} ;

interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const exerciseCalculator = (perDay : Array<number>, target : number) : ExerciseResult => {
    if(!perDay || !target) {
        throw new Error('parameters missing');
    } else if((perDay.filter(d => isNaN(Number(d))).length !== 0) || (isNaN(Number(target)))) {
        throw new Error('malformatted parameters');
    } else { 
        const periodLength = perDay.length;
        const trainingDays = perDay.filter(d => d > 0).length;
        const totalTraining = perDay.reduce((sum, d) => sum + d,0);
        const average = totalTraining / periodLength;
        const success = average > target ? true : false;
        let rating = 0;
        let ratingDescription = '';
        if(!success) {
            const metric = average * 2;
            if(metric > target) {
                rating = 2;
                ratingDescription = 'not too bad but could be better';
            } else {
                rating = 1;
                ratingDescription = 'not enough need to work more';
            }
        } else {
            rating = 3;
            ratingDescription = 'great job';
        }
        return {
            periodLength,
            trainingDays,
            success,
            rating,
            ratingDescription,
            target,
            average
        };
    }
};

try {
    const { dailyValues, target } = parseValues(process.argv);
    console.log(exerciseCalculator(dailyValues, target));
} catch(e) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Something went wrong, error: ${e.message}`);
}