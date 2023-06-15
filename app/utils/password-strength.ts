/**
 * Password validator for login pages
 */
import value from '@/app/assets/scss/_themes-vars.module.scss';

// has number
const hasNumber = (str: string) => new RegExp(/[0-9]/).test(str);

// has mix of small and capitals
const hasMixed = (str: string) => new RegExp(/[a-z]/).test(str) && new RegExp(/[A-Z]/).test(str);

// has special chars
const hasSpecial = (str: string) => new RegExp(/[!#@$%^&*)(+=._-]/).test(str);

// set color based on password strength
export const strengthColor = (count: number) => {
    if (count < 2) return { label: 'Kém', color: value.errorMain };
    if (count < 3) return { label: 'Yếu', color: value.warningDark };
    if (count < 4) return { label: 'Bình Thường', color: value.orangeMain };
    if (count < 5) return { label: 'Tốt', color: value.successMain };
    if (count < 6) return { label: 'Mạnh', color: value.successDark };
    return { label: 'Kém', color: value.errorMain };
};

// password strength indicator
export const strengthIndicator = (str: string) => {
    let strengths = 0;
    if (str.length > 5) strengths += 1;
    if (str.length > 7) strengths += 1;
    if (hasNumber(str)) strengths += 1;
    if (hasSpecial(str)) strengths += 1;
    if (hasMixed(str)) strengths += 1;
    return strengths;
};
