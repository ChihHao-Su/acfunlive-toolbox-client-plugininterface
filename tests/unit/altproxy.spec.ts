import { ALTClassHasntMemberError } from '@/ALTError';
import { ALTClass, ALTInterface, ALTObject, ALTProxy, CLASS, DECLARE_DYNAMIC, DECLARE_INTERFACE_FUNC, DYNAMIC_IMPLABLE_INTERFACE, gClassList } from '@/ALTindex'

// 应用
@DYNAMIC_IMPLABLE_INTERFACE
abstract class ITest extends ALTInterface
{
	testfunc(): string { DECLARE_INTERFACE_FUNC(); return ""; };
}

@DYNAMIC_IMPLABLE_INTERFACE
abstract class ITest2 extends ALTInterface		// This will don't work
{
	abstract testfunc(): string;
}

// 中端
class Test extends ALTObject implements ITest
{
	testfunc(): string{
		console.log("Hello!");
		return "Hello";
	}
};
DECLARE_DYNAMIC(Test)

class Test2 extends ALTObject implements ITest2
{
	testfunc(): string{
		console.log("Hello!");
		return "Hello";
	}
};
DECLARE_DYNAMIC(Test2)

test("Be able to call member of class in proxy object", () => {
    const proxy1: any = new ALTProxy<ITest>(CLASS(ITest));
	expect(() => { proxy1.testvar }).toThrowError();
	expect(proxy1.testfunc()).toBe("test");

	const proxy2: any = new ALTProxy<ITest2>(CLASS(ITest2));
	expect(() => { proxy2.testfunc() }).toThrowError(ALTClassHasntMemberError);
});