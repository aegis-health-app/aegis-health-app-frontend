import { Module, ModuleId } from '../../dto/modules/modules.dto';
import { client } from './../../config/axiosConfig';

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
/**
 *
 * @param targetId what module to add
 * @returns
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

export async function postDeleteModule(
  targetId: ModuleId
): Promise<ModuleId[] | void> {
  if (targetId === 0 || targetId === 100) {
    return;
  }

  // const deleted = deleteModule(targetId, modules);
  const { data } = await client.delete('home/module', {
    data: targetId
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
  console.log(`${targetId} ${modules}`);

  return result ? false : true;
}

export async function getModuleList(): Promise<Module[]> {
  const { data } = await client.get('home/allModule');
  return data as Module[];
}

export function addEmergencyAndManageToModuleIds(ids: ModuleId[]): ModuleId[] {
  return [0, ...ids, 100];
}
