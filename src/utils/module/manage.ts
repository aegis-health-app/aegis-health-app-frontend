import { Module, ModuleId } from '../../dto/modules/modules.dto';
<<<<<<< HEAD
import { client } from './../../config/axiosConfig';

/**
 * This function add module by its id and send across backend.
 * @param targetId what module to add
 * @returns selected module ids
 */
export async function postAddModule(
  targetId: ModuleId
): Promise<ModuleId[] | void> {
  if (targetId === 0 || targetId === 100) {
    return;
  }
  const { data } = await client.post('home/module', {
    moduleid: targetId
  });

  return data;
=======
import axios from 'axios';

/**
 * This function delete module by id and append must have module (Emergency & Select module)
 * @param targetId
 * @param modules
 * @returns
 */
function deleteModule(targetId: ModuleId, modules: Module[]): Module[] {
  const temp = modules.filter((module) => {
    if (module.moduleid !== targetId) {
      return true;
    } else {
      return false;
    }
  });

  return temp;
}

//TODO: add axios
function addModule(targetId: ModuleId, modules: Module[]): Module[] {
  // http request to backend and set value
  axios.post();
>>>>>>> 886bc2a (chore: move manage.ts to utils folder)
}

/**
 * This function delete module by its id and send across backend.
<<<<<<< HEAD
 * @param targetId what module to find if it's already added
=======
 * @param targetId what module to find it it's already added
>>>>>>> 886bc2a (chore: move manage.ts to utils folder)
 * @param modules list of modules received from backend
 * @returns modules after deletion
 */

<<<<<<< HEAD
export async function postRemovedModule(
  targetId: ModuleId
): Promise<ModuleId[] | void> {
  if (targetId === 0 || targetId === 100) {
    return;
  }

  const { data } = await client.delete('home/module', {
    data: {
      moduleid: targetId
    }
  });
  return data;
=======
//TODO: add axios
export async function deleteModuleAndSend(
  targetId: ModuleId,
  modules: Module[]
): Promise<Module[] | void> {
  if (targetId === 0 || targetId === 5) {
    return;
  }

  const deleted = deleteModule(targetId, modules);

  return deleted;
>>>>>>> 886bc2a (chore: move manage.ts to utils folder)
}

/**
 * @param targetId what module to find it it's already added
 * @param modules list of modules received from backend
 * @returns true if the module is added, else false
 */
export function getModuleIsAddedValue(
  targetId: ModuleId,
<<<<<<< HEAD
  modules: ModuleId[]
): boolean {
  if (modules.length === 0) return false;

  const result = modules.find((id) => {
    return id === targetId;
=======
  modules: Module[]
): boolean {
  const result = modules.find((module) => {
    return module.moduleid === targetId;
>>>>>>> 886bc2a (chore: move manage.ts to utils folder)
  });

  return result ? false : true;
}
<<<<<<< HEAD

/**
 * This function get all module (its name and its id) from backend.
 * @returns Retrieved module name and id.
 */
export async function getModuleList(): Promise<Module[]> {
  const { data } = await client.get('home/allModule');
  return data as Module[];
}

/**
 * Since module uses Flatlist to render, and there are two required item which is Emergency and Module Manager.
 * This function add Emergency (moduleid of 0) and Module Manager (moduleid of 100) to every time
 * elderly profile is updated.
 * @param ids module ids from elderly profile object
 * @returns ids with id of 0 and 100 added
 */
export function addEmergencyAndManageToModuleIds(ids: ModuleId[]): ModuleId[] {
  return [0, ...ids, 100];
}
=======
>>>>>>> 886bc2a (chore: move manage.ts to utils folder)
