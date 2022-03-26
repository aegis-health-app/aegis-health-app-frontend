import { Module, ModuleId } from '../../dto/modules/modules.dto';
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
}

/**
 * This function delete module by its id and send across backend.
 * @param targetId what module to find if it's already added
 * @param modules list of modules received from backend
 * @returns modules after deletion
 */

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
}

/**
 * @param targetId what module to find it it's already added
 * @param modules list of modules received from backend
 * @returns true if the module is added, else false
 */
export function getModuleIsAddedValue(
  targetId: ModuleId,
  modules: ModuleId[]
): boolean {
  if (modules.length === 0) return false;

  const result = modules.find((id) => {
    return id === targetId;
  });

  return result ? false : true;
}

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
