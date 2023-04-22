import { Skill } from '../Skills';
import { StatSet, statMod } from '../Stats';
import { ClassLevels } from './base';
import { ClassBonuses } from './ClassBonuses';
import { hdFirst, hdAverage } from './helpers';

function combineClassBonuses(classLevels: ClassLevels, stats: StatSet): ClassBonuses {
    const goodSaves = {
        fort: false,
        refl: false,
        will: false,
    };
    const result: ClassBonuses = {
        hp: 0,
        bab: 0,
        saves: {
            fort: 0,
            refl: 0,
            will: 0,
        },
        efl: {
            arc: 0,
            div: 0,
            esp: 0,
        },
        skillRanks: 0,
        features: {},
        classSkills: new Set<Skill>(),
    };
    if (classLevels.length > 0) {
        result.hp += hdFirst(classLevels[0].cls.hitDie);
    }
    for (const { cls, level } of classLevels) {
        result.hp += (hdAverage(cls.hitDie) + statMod(stats.CON)) * level;
        result.bab += cls.baseAttack * level;
        result.saves.fort += (cls.saves.fortitude ? 1 / 2 : 1 / 3) * level;
        goodSaves.fort ||= cls.saves.fortitude;
        result.saves.refl += (cls.saves.reflexes ? 1 / 2 : 1 / 3) * level;
        goodSaves.refl ||= cls.saves.reflexes;
        result.saves.will += (cls.saves.will ? 1 / 2 : 1 / 3) * level;
        goodSaves.will ||= cls.saves.will;
        result.efl.arc += cls.casting.arcane * level;
        result.efl.div += cls.casting.divine * level;
        result.efl.esp += cls.casting.spontaneous * level;
        result.skillRanks += (cls.skillRanks + statMod(stats.INT)) * level;
        for (const f of cls.featuresList.filter(f => f.level <= level)) {
            result.features[f.feature] =
                (result.features[f.feature] || 0) + 1;
        }
        cls.classSkills.forEach((value: Skill) => result.classSkills.add(value));
    }
    if (goodSaves.fort) {
        result.saves.fort += 2;
    }
    if (goodSaves.refl) {
        result.saves.refl += 2;
    }
    if (goodSaves.will) {
        result.saves.will += 2;
    }
    result.bab = Math.floor(result.bab);
    result.hp = Math.floor(result.hp);
    result.saves.fort = Math.floor(result.saves.fort);
    result.saves.refl = Math.floor(result.saves.refl);
    result.saves.will = Math.floor(result.saves.will);
    result.efl.arc = Math.floor(result.efl.arc);
    result.efl.div = Math.floor(result.efl.div);
    result.efl.esp = Math.floor(result.efl.esp);
    return result;
}

export { combineClassBonuses };