// All scenario landings. The slug is the last part of the scenario href (/colaboracion/<slug>).
import type { Landing } from './types';
import { scenarios } from '../scenarios';
import { vender } from './vender';
import { instalar } from './instalar';
import { proyectos } from './proyectos';
import { recomendar } from './recomendar';
import { negocio } from './negocio';

export const landings: Landing[] = [vender, instalar, proyectos, recomendar, negocio];

export const slugOf = (l: Landing) => scenarios.find((s) => s.id === l.id)!.href.split('/').pop()!;
