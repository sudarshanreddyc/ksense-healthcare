export const parseBP = (bpString) => {
  const [systolic, diastolic] = bpString?.split("/") || [];
  const sys = parseInt(systolic);
  const dia = parseInt(diastolic);
  return { sys, dia };
};

export const getBPScore = (bpString) => {
  const { sys, dia } = parseBP(bpString);
  if (isNaN(sys) || isNaN(dia)) return 0;
  if (sys >= 140 || dia >= 90) return 3;
  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return 2;
  if (sys >= 120 && sys <= 129 && dia < 80) return 1;
  if (sys < 120 && dia < 80) return 0;
  return 0;
};

export const getTempScore = (temp) => {
  if (typeof temp !== "number") return 0;
  if (temp >= 101.0) return 2;
  if (temp >= 99.6) return 1;
  return 0;
};

export const getAgeScore = (age) => {
  if (typeof age !== "number") return 0;
  if (age > 65) return 2;
  if (age >= 40) return 1;
  return 0;
};

export const hasDataIssue = (patient) => {
  const { blood_pressure, temperature, age } = patient;
  const { sys, dia } = parseBP(blood_pressure || "");
  return (
    !blood_pressure ||
    isNaN(sys) ||
    isNaN(dia) ||
    temperature === null ||
    typeof temperature !== "number" ||
    age === null ||
    typeof age !== "number"
  );
};

export const calculateScore = (patient) => {
  const bp = getBPScore(patient.blood_pressure);
  const temp = getTempScore(patient.temperature);
  const age = getAgeScore(patient.age);
  return bp + temp + age;
};
