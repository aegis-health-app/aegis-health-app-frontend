import { Module, ModuleId } from '../../src/dto/modules/modules.dto';

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

/**
 * This function delete module by its id and send across backend.
 * @param targetId what module to find it it's already added
 * @param modules list of modules received from backend
 * @returns modules after deletion
 */
export async function deleteModuleAndSend(
  targetId: ModuleId,
  modules: Module[]
): Promise<Module[] | void> {
  if (targetId === 0 || targetId === 5) {
    return;
  }

  const deleted = deleteModule(targetId, modules);
  // axios

  return deleted;
}

/**
 * @param targetId what module to find it it's already added
 * @param modules list of modules received from backend
 * @returns true if the module is added, else false
 */
export function getModuleIsAddedValue(
  targetId: ModuleId,
  modules: Module[]
): boolean {
  const result = modules.find((module) => {
    return module.moduleid === targetId;
  });

  return result ? false : true;
}
