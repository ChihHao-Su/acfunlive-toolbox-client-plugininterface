import { ALTDuplicateClassError } from '@/ALTError';
import { ALTClass, ALTInterface, ALTObject, DECLARE_DYNAMIC, gClassList } from '@/ALTindex'

abstract class ITest extends ALTInterface
{
	abstract hello(): void;
}

class Test extends ALTObject implements ITest
{
	hello(){
		console.log("Hello!");
	}
};
DECLARE_DYNAMIC(Test)


test("Be able to retrive info from class", () => {
	expect(new ALTClass(ITest).name).toBe("ITest");
});

test("Be able to reject registing duplicate class", () => {
	expect(() => { DECLARE_DYNAMIC(Test) }).toThrow();
});

test("Be able to get registed class", () => {
	console.log(gClassList());
	expect(gClassList()).toHaveLength(1);
});

test("Be able to constuct from ALTClass", () => {
	
});